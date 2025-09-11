import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @Matches(/^[\w.%+-]+@elaniti\.com$/, {
        message: 'Email must be a valid @elaniti.com address',
    })
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}