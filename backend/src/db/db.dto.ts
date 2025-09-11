import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsEmail, IsInt, IsNotEmpty, IsNumber, IsString, Matches, ValidateNested } from 'class-validator';

// initlize the global validations in main.ts check for any updatation.

export class SuperAdminDto {
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    @Matches(/^[\w.%+-]+@elaniti\.com$/, {
        message: 'Email must be a valid @elaniti.com address',
    })
    email: string;

    @IsNotEmpty()
    @IsString()
    first_name: string;

    @IsString()
    last_name: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsString()
    phone_number: string;
}

export class UserDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @Matches(/^[\w.%+-]+@elaniti\.com$/, {
        message: 'Email must be a valid @elaniti.com address',
    })
    email: string;

    @IsNotEmpty()
    @IsString()
    first_name: string;

    @IsNotEmpty()
    @IsString()
    last_name: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsString()
    phone_number: string;

}

export class UserRoleDto {
    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsString()
    roleId: string;
}

export class PermissionsDto {
    @IsNotEmpty()
    @IsString()
    permissionName: string;
}

export class RoleDto {
    @IsNotEmpty()
    @IsString()
    roleName: string;

    @IsString()
    description: string;

    @IsNotEmpty()
    is_system_role: boolean;

    @IsNotEmpty()
    is_internal: boolean;
}

export class RolePermissionDto {
    @IsNotEmpty()
    @IsString()
    roleId: string;

    @IsNotEmpty()
    @IsNumber()
    permissionId: number;
}

export class SuperAdminRoleDto {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsNumber()
    role_id: number;

    @IsString()
    @Matches(/^[\w.%+-]+@elaniti\.com$/, {
        message: 'Email must be a valid @elaniti.com address',
    })
    superadminEmail: string

}

export class RoleDetailsDto {
    @IsArray()
    @ArrayNotEmpty()
    @Type(() => String)
    // @IsInt({each: true})
    role_id: string[]
}

export class CreateUserDto {
    @ValidateNested()
    @Type(() => UserDto)
    user_details: UserDto;

    @ValidateNested()
    @Type(() => RoleDetailsDto)
    role_details: RoleDetailsDto
}