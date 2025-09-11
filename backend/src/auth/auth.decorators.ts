import { SetMetadata } from "@nestjs/common";

export const ROLES_KEY = 'roles';

export const PERMISSION_KEY = 'permission_name';

export const Role = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

export const Permission = (permission: string) => SetMetadata(PERMISSION_KEY, permission);