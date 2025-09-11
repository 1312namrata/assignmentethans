import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserService } from "./services/user.service";
import { SuperAdminService } from "./services/superadmin.service";

@Injectable()

export class RoleResolverInterceptor implements NestInterceptor {
    constructor( private readonly userService: UserService,
        private readonly superAdminService: SuperAdminService
     ) {}

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const req = context.switchToHttp().getRequest();
        const email = req.oidc?.user?.email;
        if (email) {
            const superAdmin = await this.superAdminService.getSuperAdminService(email);
            if (superAdmin) {
                req.userType = 'superadmin';
                req.userId = superAdmin.id;
            }
            else {
                const user = await this.userService.getUseService(email);
                req.userType = 'user';
                req.userId = user?.id;
            }
        }
        return next.handle();
    }
}