import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { SuperAdmin, SuperAdminRole } from "../db.entities";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { SuperAdminDto, SuperAdminRoleDto } from "../db.dto";

@Injectable()
export class SuperAdminService {

    constructor(
        @InjectRepository(SuperAdmin)
        private superAdminRepo: Repository<SuperAdmin>,


        @InjectRepository(SuperAdminRole)
        private superadminRoleRepo: Repository<SuperAdminRole>,

        private readonly dataSource: DataSource,

    ) { }

    async getSuperAdminService(email: string): Promise<SuperAdmin | null> {
        try {
            const result = await this.superAdminRepo.findOne({
                where: {
                    email: email
                }
            });
            return result;
        } catch (error) {
            console.log("error: " + error);
            throw new InternalServerErrorException('Fail to fetch super admin form DB: ' + error.message);
        }
    }
    async CreateSuperAdminService(superAdminDto: SuperAdminDto, superAdminId: string): Promise<SuperAdmin | null> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const password = superAdminDto.password;
            console.log(password);
            const passwordHash = await bcrypt.hash(password, 10);
            console.log(passwordHash);
            const createSuperAdmin = queryRunner.manager.create(SuperAdmin, {
                email: superAdminDto.email,
                firstName: superAdminDto.first_name,
                lastName: superAdminDto.last_name,
                password: passwordHash,
                phoneNumber: superAdminDto.phone_number,
                createdBy: superAdminId
            });
            const result = await queryRunner.manager.save(SuperAdmin, createSuperAdmin, {reload: true});
            await queryRunner.commitTransaction();
            return result;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('fail to create super admin: ' + error.message);
        } finally {
            queryRunner.release();
        }
    }
    // add superadmin roles
    async addSuperAdminRoleService(superadminRoleDto: SuperAdminRoleDto, superadminId: number): Promise<SuperAdminRole | null> {
        try {
            const isExist = await this.getSuperAdminService(superadminRoleDto.superadminEmail);
            if (isExist === null) {
                throw new NotFoundException('Super admin not found');
            }
            const addSuperAdminRole = this.superadminRoleRepo.create({
                id: superadminRoleDto.id,
                roleId: superadminRoleDto.role_id,
                created_by: superadminId
            })
            const result = await this.superAdminRepo.save(addSuperAdminRole);
            return result;
        } catch (error) {
            console.log("error: " + error);
            throw new NotFoundException("error: " + error);
        }
    }
}