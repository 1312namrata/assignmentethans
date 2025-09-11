import { AuthGuard } from "@nestjs/passport";
import { UserService } from "../services/user.service";
import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { OidcAuthGuard, PermissionToRoleGuard, RoleGuard } from "src/auth/auth.guard";
import { Permission, Role } from "src/auth/auth.decorators";
import { CreateUserDto, UserDto, UserRoleDto } from "../db.dto";
import { Request } from 'express';

@UseGuards(OidcAuthGuard)
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService, 
        
    ) { };

    @UseGuards(PermissionToRoleGuard, RoleGuard)
    @Permission("9") // view user
    @Get()
    async getAllUsers() {
        const result = await this.userService.getAllUsers();
        return { "users": result };
    }

    @Get("/single-user/:email")
    async getUser(@Param("email") email: string) {
        const result = await this.userService.getUseService(email);
        console.log(result);
        return { "result": result, "test": "hello", "email":email };
    }

    @Get('/user-roles/:userId')
    async getUserRoles(@Param("userId") userId: string) {
        const result = await this.userService.getRolesWRTUserService(userId);
        return { "user_roles": result };
    }

    @UseGuards(RoleGuard)
    @Role('superadmin')
    @Post('/create-user')
    async createUser(@Body() userDto: UserDto, @Req() req: Request) {
        const superAdminId = req.user?.["userId"];
        const result = await this.userService.CreateUser(userDto, superAdminId);
        return { "message": "User created sucessfully", "user_details": result }
    }

    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Role('superadmin')
    @Post('/add-role-to-user')
    async addRoleToUser(@Body() userRoleDto: UserRoleDto, @Req() req: Request) {
        const superAdminId = req.user?.['userId'];
        const result = await this.userService.AddRoleToUserService(userRoleDto, superAdminId);
        return { "message": "Role added to user sucessfully", "user_role_details": result, "role_added_by": superAdminId };
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('test') // create user with a flow.
    async createUserxyz(@Body() createUserDto: CreateUserDto, @Req() req: Request) {
        if (req.user?.["roles"].includes("superadmin")) {
            const result = await this.userService.createUserService(createUserDto, req.user?.['userId'], "superadmin");
            return {"message": result};
        } else {
            const result = await this.userService.createUserService(createUserDto, req.user?.['userId'], "user");
            return {"message": result};
        }
    }
}
