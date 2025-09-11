import { InjectRepository } from "@nestjs/typeorm";
import { User, UserRole, Permission, Role } from "../db.entities";
import { DataSource, In, Repository } from "typeorm";
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, ConflictException } from "@nestjs/common";
import { CreateUserDto, UserDto, UserRoleDto } from "../db.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,

        @InjectRepository(UserRole)
        private userRoleRepo: Repository<UserRole>,

        @InjectRepository(Permission)
        private permissionsRepo: Repository<Permission>,

        private readonly dataSource: DataSource
    ) { }
    // user manuplations implement here.
    async getAllUsers(): Promise<User[] | null> {
        try {
            const result = await this.userRepo.find();
            return result;
        } catch (error) {
            console.log("error: " + error);
            throw new InternalServerErrorException('Fail to fetch users form DB');
        }
    }

    async getUseService(email: string): Promise<User | null> {
        try {
            const result = await this.userRepo.findOne({
                where: {
                    email: email
                }
            });
            return result;
        } catch (error) {
            console.log("error: " + error);
            throw new InternalServerErrorException('Fail to fetch user form DB');
        }
    }

    async CreateUser(userDto: UserDto, superAdminId: string): Promise<User | null> {
        try {
            const password = userDto.password;
            const paswordHash = await bcrypt.hash(password, 10);
            const createUser = this.userRepo.create({
                email: userDto.email,
                firstName: userDto.first_name,
                lastName: userDto.last_name,
                phoneNumber: userDto.phone_number,
                status: 'approved',
                createdBySuperadmin: superAdminId,

            })
            const result = await this.userRepo.save(createUser);
            return result;
        } catch (error) {
            console.log("error: " + error);
            throw new InternalServerErrorException('Failed to create user: ' + error)
        }
    }

    async createUserService(createUserDto: CreateUserDto, user_id: string, created_by: string): Promise<User | null> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            // user check
            const isExist = await queryRunner.manager.findOne(User, {
                where: {
                    email: createUserDto.user_details.email
                }
            })

            if (isExist !== null) {
                throw new ConflictException("user exist");
            }

            // hash password
            const passwordHash = await bcrypt.hash(createUserDto.user_details.password, 10);
            // created by
            let createUser: any;
            // create a user object
            if (created_by === "superadmin") {
                createUser = queryRunner.manager.create(User, {
                    email: createUserDto.user_details.email,
                    firstName: createUserDto.user_details.first_name,
                    lastName: createUserDto.user_details.last_name,
                    phoneNumber: createUserDto.user_details.phone_number,
                    createdBySuperadmin: user_id
                });
            } else {
                createUser = queryRunner.manager.create(User, {
                    email: createUserDto.user_details.email,
                    firstName: createUserDto.user_details.first_name,
                    lastName: createUserDto.user_details.last_name,
                    phoneNumber: createUserDto.user_details.phone_number,
                    password: passwordHash,
                    createdByUser: user_id
                });
            }
            // save user
            const saveUser = await queryRunner.manager.save(User, createUser);
            // check roles 
            console.log("roles: " + createUserDto.role_details.role_id.length);
            const roles = createUserDto.role_details.role_id;
            const isRolesExist = await queryRunner.manager.find(Role, {
                where: {
                    role_id: In(roles)
                }
            });
            if (roles.length !== isRolesExist.length) {
                throw new BadRequestException("One or more roles are invalid");
            }
            // check assigning user can assign roles to new user
            // note: need to fetch roles of assigner and check he can assign the payload roles to a new user.
            const canAssign = roles.every;
            if (!canAssign) {
                throw new BadRequestException("Cant assign a role which is greater than you")
            }
            // adding roles to user
            const createUserRoles = roles.map(roles =>
                queryRunner.manager.create(UserRole, {
                    userId: saveUser.id,
                    roleId: roles,
                    assignedBy: user_id
                })
            );
            await queryRunner.manager.save(UserRole, createUserRoles);
            // await queryRunner.commitTransaction(); // if we are not commit transaction it will never reflect.
            return saveUser
        } catch (error) {
            console.log("error: " + error);
            throw new InternalServerErrorException('Failed to create user: ' + error)
        } finally {
            await queryRunner.release();
        }
    }

    async AddRoleToUserService(userRoleDto: UserRoleDto, user_id: number): Promise<UserRole | null> {
        try {
            console.log("userRoleDto: ", userRoleDto);
            // need to do: need to check fk checks like user and roles exists or not.
            const createUserRole = this.userRoleRepo.create({
                userId: userRoleDto.userId,
                roleId: userRoleDto.roleId,
            })
            const result = await this.userRoleRepo.save(createUserRole);
            return result;
        } catch (error) {
            console.log("error: " + error);
            throw new InternalServerErrorException('Failed to add role to user: ' + error)
        }
    }

    // get roles wrt user
    async getRolesWRTUserService(id: string): Promise<UserRole[] | null> {
        try {
            const result = await this.userRoleRepo.find({
                where: {
                    userId: id
                },
                relations: ['role']
            })
            return result;
        } catch (error) {
            console.log("error: " + error);
            throw new NotFoundException("error: " + error);
        }
    }

    // // get superamin roles
    // async getSuperAdminRole(id: number): Promise<SuperAdminRole | null> {
    //     try {

    //     } catch (error) {
    //         console.log("error: " + error);
    //         throw new NotFoundException("error: " + error);
    //     }
    // }
    // user checks implement here.
    async checkUser(email: string): Promise<boolean> {
        return await this.userRepo.exists({ where: { email } });
    }


}
