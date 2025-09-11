import { Body, Controller, Get, Param, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import type { Request } from 'express';
import { DbService } from './db.service';
import { PermissionsDto, RoleDto, RolePermissionDto } from './db.dto';
import { AuthGuard } from '@nestjs/passport';
import { OidcAuthGuard, PermissionToRoleGuard, RoleGuard } from 'src/auth/auth.guard';
import { Permission, Role } from 'src/auth/auth.decorators';
import { RoleResolverInterceptor } from './db.Interceptor';

@UseGuards(OidcAuthGuard)
@Controller('db')
export class DbController {
    constructor(private readonly dbService: DbService) { };

    @Get()
    @UseGuards(AuthGuard('jwt'), PermissionToRoleGuard, RoleGuard)
    @Permission('')
    getDb(): any {
        return this.dbService.getDB();
    }

    @UseGuards(AuthGuard('old-jwt'))
    @Get("/samyak")
    getSmayak(): any {
        return this.dbService.getSamyak();
    }

    @UseGuards(AuthGuard("jwt"))
    @Get("/hello-auth0")
    getHelloAyuth0(@Req() req: Request) {
        // console.log("user: " + req.user);
        return { "message": "hello from auth0", "user": req.user };
    }

    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Role('superadmin')
    @Post("/add-role")
    async addRole(@Body() roleDto: RoleDto, @Req() req: Request) {
        const superAdminId = req.user?.['userId'];
        const result = await this.dbService.addRoleService(roleDto, superAdminId);
        return { "message": "role added sucessfully", "role_details": result, "role_added_by": superAdminId };
    }

    @Get('/get-permission/:permissionId')
    async getPermission(@Param("permissionId") permissionId: number) {
        const resuslt = await this.dbService.getPermission(permissionId);
        return { "permission": resuslt };
    }

    @Get("/get-roles-for-permission/:permissionId")
    async getRolesForPermission(@Param("permissionId") permissionId: number) {
        const result = await this.dbService.getRolesForPermissionService(permissionId);
        return result;
    }

    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Role('superadmin')
    @Post('/add-permission')
    async addPermission(@Body() permissionDto: PermissionsDto, @Req() req: Request) {
        const superAdminId = req.user?.['userId'];
        const result = await this.dbService.addPermission(permissionDto, superAdminId);
        return { "message": "Permission added sucessfully", "Permission_details": result, "superadmin_id": superAdminId };
    }

    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Role('superadmin')
    @Post('add-role-to-permission')
    async addRoleToPermission(@Body() rolePermissionDto: RolePermissionDto, @Req() req: Request) {
        const superAdminId = req.user?.["userId"];
        const result = await this.dbService.addRoleToPermissionService(rolePermissionDto, superAdminId);
        return { "message": "Role assigned to permission sucessfully", "role_permission_details": result, "super_admin_id": superAdminId };
    }

    @Get('/get-all-roles')
    async getAllRoles() {
        const result = await this.dbService.getAllRolesService();
        return { "roles": result };
    }

    @Get('/get-all-regions')
    async getAllRegions() {
        const result = await this.dbService.GetAllRegions();
        return { "regions": result };     
    }

    @UseInterceptors(RoleResolverInterceptor)
    @Get('roles-can-assigin')
    async getWhoCanAssignRoles(@Req() req: Request) {
        const userId = req['userId'];
        const roles_cat = [
            'general',
            'elaniti_admin_roles',
            'elaniti_lab_roles',
            'elaniti_data_roles',
            'enterprise_roles',
            'farming_roles',
        ];

        let result;

        if (req['userType'] === 'superadmin') {
            result = await this.dbService.showRolesToCreateUserService('superadmin', userId);
        } else {
            result = await this.dbService.showRolesToCreateUserService('user', userId);
        }

        console.log(result);

        // ✅ Group roles by category
        const groupedRoles: Record<string, any[]> = {};
        for (const cat of roles_cat) {
            groupedRoles[cat] = [];
        }

        result?.forEach((ur) => {
            const roleName = ur.display_name;
            const category = ur.roleCategory; // assuming you have roleCategory field in DB
            if (roleName && category && groupedRoles.hasOwnProperty(category)) {
                groupedRoles[category].push(roleName);
            }
        });

        return {
            roles: groupedRoles,
            requested_by: userId,
        };
    }
}


@Controller('tenant')
export class TenantController {
    constructor(private readonly dbService: DbService) { };
    // write actions for tenant services.
    @Get("/get-all-tenants")
    async getAllTenants(){
        const result = await this.dbService.getAllTenants();
        return result;
    }

}