// src/auth/dto/mirror-user.dto.ts
import { IsString, IsOptional, IsEmail, IsBoolean } from 'class-validator';
import { ArrayNotEmpty, IsArray,IsInt, IsNotEmpty, IsNumber, Matches, ValidateNested } from 'class-validator';

export class MirrorUserDto {
  @IsString()
  sub: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    // @Matches(/^[\w.%+-]+@elaniti\.com$/,{
    //     message: 'Email must be a valid @elaniti.com address',
    // }) uncomment this to enable @elaniti.com restriction
    email?: string;

    @IsOptional()
    @IsString()
    first_name: string;

    @IsOptional()
    @IsString()
    last_name: string;

}
