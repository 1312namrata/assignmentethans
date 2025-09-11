import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission, Role, RolePermission, UserRole, Levels, Regions, Tenants } from './db.entities';
import { Repository } from 'typeorm';
import { PermissionsDto, RoleDto, RolePermissionDto } from './db.dto';
import { UserService } from './services/user.service';

@Injectable()
export class DbService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepo: Repository<Role>,

        @InjectRepository(UserRole)
        private readonly userRoleRepo: Repository<UserRole>,

        @InjectRepository(Permission)
        private readonly permissionsRepo: Repository<Permission>,

        @InjectRepository(Regions)
        private readonly regionsRepo: Repository<Regions>,

        @InjectRepository(Tenants)
        private readonly tenantsRepo: Repository<Tenants>,

        @InjectRepository(RolePermission)
        private readonly rolePermissionRepo: Repository<RolePermission>,

        private readonly userService: UserService
    ) { }
    getDB(): string {
        return "call from db -> hello";
    }
    getSamyak(): string {
        return "Call from db -> samyak";
    }

    async addRoleService(roleDto: RoleDto, superAdminId: string): Promise<Role | null> {
        try {
            const role_name = roleDto.roleName.replace(/\s+/g, '_').toLowerCase();
            const display_name = roleDto.roleName
                .trim()
                .toLowerCase()
                .replace(/\b\w/g, (char) => char.toUpperCase());
            const createRole = this.roleRepo.create({
                roleName: role_name,
                display_name: display_name,
                description: roleDto.description,
                is_system_role: roleDto.is_system_role,
                is_internal: roleDto.is_internal,
                createdBy: superAdminId,
            })
            const result = await this.roleRepo.save(createRole);
            return result;
        } catch (error) {
            console.log("Error: " + error);
            throw new InternalServerErrorException("Fail to add role: " + error)
        }
    }

    // to grt role with role id
    async getRole(role_id: string): Promise<Role | null> {
        try {
            const result = await this.roleRepo.findOneBy({ role_id: role_id });
            return result;
        } catch (error) {
            console.log("Error: " + error);
            throw new InternalServerErrorException("Fail to fetch role: " + error)
        }
    }

    // show roles wrt to user
    async showRolesToCreateUserService(user: string, userId: string): Promise<Role[] | UserRole[] | null> {
        try {
            if (user === 'superadmin') {
                const result = await this.getAllRolesService();
                return result;
            } else if (user === 'user') {
                const userRoles = await this.userRoleRepo.find({
                    where: {
                        userId: userId
                    },
                    relations: ['role']
                })
                return userRoles;
            }
            return null;
        } catch (error) {
            console.log("Error: " + error);
            throw new InternalServerErrorException("Fail to fetch roles: " + error)
        }
    }
    // get all roles
    async getAllRolesService(): Promise<Role[] | null> {
        try {
            const result = await this.roleRepo.find();
            return result;
        } catch (error) {
            console.log("Error: " + error);
            throw new InternalServerErrorException("Fail to fetch roles: " + error)
        }
    }
    // add permissions
    async addPermission(permissionDto: PermissionsDto, superAdminId: number): Promise<Permission | null> {
        try {
            const arg = permissionDto.permissionName.replace(/\s+/g, '').toLowerCase();
            const create = await this.permissionsRepo.create({
                permissionName: arg,
                createdBy: superAdminId
            });
            const result = await this.permissionsRepo.save(create);
            return result;

        } catch (error) {
            console.log("error: " + error)
            throw new InternalServerErrorException(error);
        }
    }

    // get permission
    async getPermission(permissionId: number): Promise<Permission | null> {
        try {
            const result = await this.permissionsRepo.findOneBy({ permission_id: permissionId });
            console.log("result: " + result);
            return result;
        } catch (error) {
            console.log("error: " + error);
            throw new InternalServerErrorException("Fail to get permission: " + error.message);
        }
    }

    async addRoleToPermissionService(rolePermissionDto: RolePermissionDto, superAdminId: number): Promise<RolePermission | null> {
        try {
            const roleExist = await this.getRole(rolePermissionDto.roleId);
            if (roleExist === null) {
                throw new NotFoundException('Role not found');
            }
            const permissionExist = await this.getPermission(rolePermissionDto.permissionId);
            if (permissionExist === null) {
                throw new NotFoundException('Permission not found');
            }
            const createRoleToPermission = this.rolePermissionRepo.create({
                roleId: rolePermissionDto.roleId,
                permissionId: rolePermissionDto.permissionId,
                createdBy: superAdminId
            })
            const result = await this.rolePermissionRepo.save(createRoleToPermission);
            return result;
        } catch (error) {
            console.log("error: " + error);
            throw new InternalServerErrorException("Fail to get permission: " + error.message);
        }
    }

    async getRolesForPermissionService(permissionId: number): Promise<RolePermission[] | null> {
        try {
            const permissionExist = await this.getPermission(permissionId);
            if (permissionExist === null) {
                throw new NotFoundException("Permission not found");
            }
            const result = await this.rolePermissionRepo.find({
                where: {
                    permissionId: permissionId
                },
                relations: ['role']
            })
            return result;
        } catch (error) {
            console.log("error: " + error);
            throw new InternalServerErrorException("Fail to get roles for permission: " + error.message);
        }
    }
    async GetAllRegions(): Promise<any> {
        try {
            // Fetch regions with their associated level
            const result = await this.regionsRepo.find({
            relations: ['level'], // load the Levels entity
            where: { is_deleted: false },
            });

            const groupedByLevel = result.reduce((acc, region) => {
            const levelKey = region.level.level_name; // use level_name instead of level_id

            // remove `level_id` and full level object if you don’t want it
            const { level, level_id, ...regionWithoutLevel } = region;

            if (!acc[levelKey]) {
                acc[levelKey] = [];
            }

            acc[levelKey].push(regionWithoutLevel);
            return acc;
            }, {});

            return groupedByLevel;

        } catch (error) {
            console.error("error: ", error);
            throw new InternalServerErrorException("Fail to get regions: " + error.message);
        }
    }

    async getAllTenants(): Promise<any> {
        try {
            return await this.tenantsRepo.find();
        } catch (error) {
            console.error("error: ", error);
            throw new InternalServerErrorException("Fail to get tenants: " + error.message);
        }

    }



}
