import { Body, Controller, Get, InternalServerErrorException, NotAcceptableException, Post, Req, Res, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './auth.dto';
import { AuthService } from './auth.service';
import { UserService } from 'src/db/services/user.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly authService: AuthService
    ) { };

    @Post('/superadmin-login')
    async superadminLogin(@Body() loginDto: LoginDto) {
        try {
            const superAdmin = await this.authService.SuperAdminLoginService(loginDto);
            const superAdminId = Number(superAdmin?.id);
            // if (isNaN(superAdminId)) {
            //     throw new InternalServerErrorException('SuperAdmin ID is undefined or invalid');
            // }
            // const roles = await this.userService.getRolesWRTUserService(superAdminId); // kept for reference need to correct with superadmin roles table entries.
            const payload = {
                id: superAdmin?.id,
                email: superAdmin?.email,
                roles: [
                    'superadmin'
                ]
            }
            const token = this.jwtService.sign(payload);
            return { "super_admin": payload, "token": token };
        } catch (error) {
            console.log("error: " + error);
            throw new InternalServerErrorException('Login failed: ' + error.message);
        }
    }

    @Post("/login")
    async Login(@Body() loginDto: LoginDto) {
        try {
            const user = await this.authService.UserLoginService(loginDto);
            const userId = String(user?.id);
            console.log('user_id:', userId, '| type:', typeof userId);

            // if (isNaN(userId)) {
            //     throw new InternalServerErrorException('User ID is undefined or invalid');
            // }

            const user_roles = await this.userService.getRolesWRTUserService(userId);
            // ✅ Extract only roleName
            const roleNames = user_roles?.map((ur) => ur.role?.roleName).filter(Boolean) || []; // .filter(Boolean) to remove any undefined/null values
            const payload = {
                id: user?.id,
                email: user?.email,
                roles: roleNames
            }
            const token = this.jwtService.sign(payload);
            return { 'user': payload, "token": token };
        } catch (error) {
            console.log("error: " + error);
            throw new InternalServerErrorException('Login failed: ' + error.message);
        }
    }

    @Get('/me')
    me(@Req() req: Request, @Res() res: Response) {
        const isAuth = req.oidc?.isAuthenticated() ?? false;
        if (isAuth) {
            return req.oidc.user;
        } else {
            throw new NotAcceptableException('User not authenticated');
        }
    }

}
