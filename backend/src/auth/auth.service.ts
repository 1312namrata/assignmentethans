import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SuperAdmin, User } from 'src/db/db.entities';
import { LoginDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/db/services/user.service';
import { SuperAdminService } from 'src/db/services/superadmin.service';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, 
        private readonly superAdminService: SuperAdminService
    ) { };

    async loginService(loginDto: LoginDto): Promise<User | SuperAdmin | null> {
        try {
            const { email, password } = loginDto;

            if (email.endsWith("@elaniti.superadmin.com")) {
                const superAdmin = await this.superAdminService.getSuperAdminService(email);

                if (!superAdmin || !superAdmin.password) {
                    throw new InternalServerErrorException('Super Admin not found or password missing');
                }

                const isMatch = await bcrypt.compare(password, superAdmin.password);
                if (!isMatch) {
                    throw new InternalServerErrorException('Invalid password for Super Admin');
                }

                return superAdmin;

            } else {
                const user = await this.userService.getUseService(email);

                if (!user ) {
                    throw new InternalServerErrorException('User not found or password missing');
                }

                // const isMatch = await bcrypt.compare(password, user.password);
                // if (!isMatch) {
                //     throw new InternalServerErrorException('Invalid password');
                // }

                return user;
            }

        } catch (error) {
            console.error("error:", error);
            throw new InternalServerErrorException(error);
        }
    }

    async SuperAdminLoginService(loginDto: LoginDto): Promise<SuperAdmin | null> {
        try {
            const { email, password } = loginDto;
            console.log("email: " + email, "password: " + password);
            const superAdmin = await this.superAdminService.getSuperAdminService(email);
            console.log("superadmin: "+ superAdmin);
            if (!superAdmin || !superAdmin.password) {
                throw new InternalServerErrorException('Super Admin not found or password missing');
            }

            const isMatch = await bcrypt.compare(password, superAdmin.password);
            if (!isMatch) {
                throw new InternalServerErrorException('Invalid password for Super Admin');
            }

            return superAdmin;
        } catch (error) {
            console.error("error:", error);
            throw new InternalServerErrorException(error);
        }
    }

    async UserLoginService(loginDto: LoginDto): Promise<User | null> {
        try {
            const { email, password } = loginDto;
            const user = await this.userService.getUseService(email);
            if (!user) {
                throw new InternalServerErrorException('User not found or password missing');
            }

            // const isMatch = await bcrypt.compare(password, user.password);
            // if (!isMatch) {
            //     throw new InternalServerErrorException('Invalid password');
            // }

            return user;
        } catch (error) {
            console.error("error:", error);
            throw new InternalServerErrorException(error);
        }
    }

}
