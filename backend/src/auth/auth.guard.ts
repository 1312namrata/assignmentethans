import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PERMISSION_KEY, ROLES_KEY } from "./auth.decorators";
import { DbService } from "src/db/db.service";
import { UserService } from "src/db/services/user.service";
import { Request, Response } from 'express';
import { requiresAuth } from 'express-openid-connect';
import { SuperAdminService } from "src/db/services/superadmin.service";


@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector,
        private readonly userService: UserService,

        private readonly superAdminService: SuperAdminService
    ) { };
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        const request = context.switchToHttp().getRequest();
        const email = request.oidc.user?.email;

        if (!email) {
            return false; // ❌ no email, no access
        }

        let roleNames: string[] = [];

        const superAdmin = await this.superAdminService.getSuperAdminService(email);
        if (superAdmin) {
            roleNames.push('superadmin');
        } else {
            // extracting user from DB using email
            const user = await this.userService.getUseService(email);
            if (user) {
                const userId = user.id;
                const user_roles = await this.userService.getRolesWRTUserService(userId);
                // ✅ Extract only roleName
                roleNames = user_roles?.map((ur) => ur.role?.roleName).filter(Boolean) || []; // .filter(Boolean) to remove any undefined/null values
            } else {
                return false; // ❌ no user, no access
            }
        }


        if (!requiredRoles || requiredRoles.length === 0) return true;
        // ✅ Allow if any user role matches required role
        return roleNames.some((role) => requiredRoles.includes(role));
    }
}

@Injectable()
export class PermissionToRoleGuard implements CanActivate {
    constructor(
        private refelector: Reflector,

        private readonly userServicr: UserService,

        private readonly dbService: DbService,

    ) { };

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const permission_id = this.refelector.getAllAndOverride<string>(PERMISSION_KEY, [
            context.getHandler(), // for method level guards
            context.getClass(), // for class level guards 
        ])

        if (!permission_id) {
            return true; // no permission means access for all
        }

        const permissionIdNum = Number(permission_id);
        const roles = await this.dbService.getRolesForPermissionService(permissionIdNum)

        const roleNames = roles?.map((ur) => ur.role?.roleName).filter(Boolean);
        console.log("role names: " + roleNames);
        Reflect.defineMetadata(ROLES_KEY, roleNames, context.getHandler()); // for method level guards
        Reflect.defineMetadata(ROLES_KEY, roleNames, context.getClass()); // for class level guards 
        return true; // role guard will handle the rest auth 

    }
}

@Injectable()
export class OidcAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const req = context.switchToHttp().getRequest<Request>();
        const res = context.switchToHttp().getResponse<Response>();

        return new Promise((resolve, reject) => {
            requiresAuth()(req, res, (err?: any) => {
                if (err) {
                    return reject(new UnauthorizedException());
                }
                if (!req.oidc?.isAuthenticated()) {
                    return reject(new UnauthorizedException());
                }
                resolve(true);
            });
        });
    }
}
