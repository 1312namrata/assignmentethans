import { FileOptions } from 'buffer';
import {
    Column,
    Decimal128,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';


@Entity({ name: 'superadmin' })
export class SuperAdmin {
    @PrimaryColumn({ name: 'id', type: 'varchar', length: 50, default: () => "'ela' || EXTRACT(YEAR FROM now())::text || nextval('elaniti_seq')::text" })
    id: string;

    @Column({ name: 'email', unique: true, nullable: false })
    email: string;

    @Column({ name: 'first_name', nullable: false })
    firstName: string;

    @Column({ name: 'last_name' })
    lastName: string;

    @Column({ name: 'password', nullable: false })
    password: string;

    @Column({ name: 'phone_number' })
    phoneNumber: string;

    @Column({ name: 'created_by', type: 'varchar', length: 50 })
    createdBy: string;

    @Column({ name: 'created_at', type: 'timestamptz', default: () => 'now()'})
    createdAt: Date;
}



@Entity({ name: 'users' })
export class User {
    @PrimaryColumn({ name: 'id', type: 'varchar', length: 50, default: () => "'ela' || EXTRACT(YEAR FROM now())::text || nextval('elaniti_seq')::text" })
    id: string;

    @Column({ name: 'email', unique: true })
    email: string;

    @Column({ name: 'identity_sub', unique: true })
    identitySub: string;

    @Column({ name: 'first_name' })
    firstName: string;

    @Column({ name: 'last_name', nullable: true })
    lastName: string;


    @Column({ name: 'phone_number', nullable: true })
    phoneNumber: string;

    @Column({ name: 'status', default: 'pending' , type:'enum', enum: ['pending', 'active', 'inactive', 'rejected', 'suspended','system']})
    status: string;

    @Column({ name: 'created_by_superadmin', type: 'bigint', nullable: true })
    createdBySuperadmin: string;

    @Column({ name: 'invited_by', type: 'bigint', nullable: true })
    invitedBy: string;

    @Column({ name: 'approved_by', type: 'bigint', nullable: true })
    approvedBy: string;

    @Column({ name: 'registered_at', type: 'timestamptz', nullable: true })
    registeredAt: Date;

    @Column({ name: 'created_at', type: 'timestamptz', default: () => 'now()' })
    createdAt: Date;
}


@Entity({ name: 'roles' })
export class Role {
    @PrimaryColumn({ name: 'role_id', type: 'varchar', length: 50, default: () => "'elar' || nextval('elaniti_role_seq')" })
    role_id: string;

    @Column({ name: 'role_name', type: 'varchar', length: 100, unique: true, nullable: false })
    roleName: string;

    @Column({ name: 'display_name', type: 'varchar', length: 100, unique: true})
    display_name: string;

    @Column({name: 'description', type: 'text'})
    description: string;

    @Column({ name: 'is_system_role', type: 'boolean', default: false})
    is_system_role: boolean;

    @Column({ name: 'is_internal', type: 'boolean', default: false})
    is_internal: boolean;

    @Column({ name: 'role_category', type: 'varchar', length: 50})
    roleCategory: string;

    @Column({ name: 'created_at', type: 'timestamptz', default: () => 'now()' })
    createdAt: Date;

    @Column({ name: 'created_by', type: 'varchar', length: 50 })
    createdBy: string;

    @Column({ name: 'updated_at', type: 'timestamptz', nullable: true, default: null })
    updatedAt: Date;

    @Column({ name: 'updated_by', type: 'varchar', length: 50, nullable: true, default: null })
    updatedBy: number;
}

@Entity({ name: 'superadmin_role' })
export class SuperAdminRole {
    @PrimaryColumn({ name: 'id', type: 'varchar', length: 50})
    id: string;

    @PrimaryColumn({ name: 'role_id', type: 'bigint' })
    roleId: number;

    @Column({ name: 'created_by', type: 'bigint' })
    created_by: number;

    @Column({ name: 'created_at', type: 'timestamptz', default: () => 'now()' })
    createdAt: Date;

    @ManyToOne(() => SuperAdmin, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id' })
    superAdmin: SuperAdmin;

    @ManyToOne(() => Role, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'role_id' })
    role: Role;
}

@Entity({ name: 'permissions' })
export class Permission {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    permission_id: number;

    @Column({ name: 'permission_name', unique: true })
    permissionName: string;

    @Column({ name: 'created_at', type: 'timestamptz', default: () => 'now()' })
    createdAt: Date;

    @Column({ name: 'created_by', type: 'bigint' })
    createdBy: number;

    @Column({ name: 'updated_at', type: 'timestamptz', nullable: true })
    updatedAt: Date;

    @Column({ name: 'updated_by', type: 'bigint', nullable: true })
    updatedBy: number;
}


@Entity({ name: 'user_roles' })
export class UserRole {
    @PrimaryColumn({ name: 'id', type: 'varchar', length: 50 })
    userId: string;

    @PrimaryColumn({ name: 'role_id', type: 'varchar', length: 50 })
    roleId: string;

    @Column({ name: 'assigned_at', type: 'timestamptz', default: () => 'now()' })
    assignedAt: Date;

    @Column({ name: 'assigned_by_superadmin', type: 'bigint', nullable: false })
    assignedBySuperAdmin: number;

    @Column({ name: 'assigned_by_user', type: 'bigint', nullable: false })
    assignedByUser: number;

    @Column({ name: 'updated_at', type: 'timestamptz', nullable: true })
    updatedAt: Date;

    @Column({ name: 'updated_by', type: 'bigint', nullable: true })
    updatedBy: number;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id' })
    user: User;

    @ManyToOne(() => Role, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'role_id' })
    role: Role;
}


@Entity({ name: 'role_permissions' })
export class RolePermission {
    @PrimaryColumn({ name: 'role_id' })
    roleId: string;

    @PrimaryColumn({ name: 'permission_id' })
    permissionId: number;

    @Column({ name: 'created_at', type: 'timestamptz', default: () => 'now()' })
    createdAt: Date;

    @Column({ name: 'created_by', type: 'bigint' })
    createdBy: number;

    @Column({ name: 'updated_at', type: 'timestamptz', nullable: true })
    updatedAt: Date;

    @Column({ name: 'updated_by', type: 'bigint', nullable: true })
    updatedBy: number;

    @ManyToOne(() => Role, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'role_id' })
    role: Role;

    @ManyToOne(() => Permission, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'permission_id' })
    permission: Permission;
}


@Entity({ name: 'user_override_permissions' })
export class UserOverridePermission {
    @PrimaryColumn({ name: 'id', type: 'bigint' })
    userId: string;

    @PrimaryColumn({ name: 'permission_id', type: 'bigint' })
    permissionId: string;

    @Column({ name: 'assigned_at', type: 'timestamptz', default: () => 'now()' })
    assignedAt: Date;

    @Column({ name: 'assigned_by', type: 'bigint' })
    assignedBy: string;

    @Column({ name: 'updated_at', type: 'timestamptz', nullable: true })
    updatedAt: Date;

    @Column({ name: 'updated_by', type: 'bigint', nullable: true })
    updatedBy: string;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id' })
    user: User;

    @ManyToOne(() => Permission, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'permission_id' })
    permission: Permission;
}


//Levels Entity
@Entity({ name: 'levels' })
export class Levels {
    @PrimaryColumn({ name: 'level_id', type: 'varchar', length: 50})
    level_id: string;

    @Column({ name: 'level_name', type: 'varchar', length: 100, unique: true, nullable: false })
    level_name: string;

    @Column({ name: 'description', type: 'text'})
    description: string;

    @Column({ name: 'created_at', type: 'timestamptz', default: () => 'now()' })
    createdAt: Date;
        
    @Column({ name: 'is_deleted', type: 'boolean', default: false})
    is_deleted: boolean;

    @Column({ name: 'deleted_at', type: 'timestamptz', nullable: true, default: null })
    deleted_at: Date;

    @Column({ name: 'deleted_by', type: 'varchar', length: 50, nullable: true, default: null })
    deleted_by: string;

}

//Regions Entity
@Entity({ name: 'regions' })
export class Regions {
    @PrimaryColumn({ name: 'region_id', type: 'varchar', length: 50})
    region_id: string;
    
    @PrimaryColumn({ name: 'level_id', type: 'varchar', length: 50, nullable: false })
    level_id: string;

    @Column({ name: 'regions_name', type: 'text'})
    regions_name: string;

    @Column({ name: 'created_at', type: 'timestamptz', default: () => 'now()' })
    createdAt: Date;

    @Column({ name: 'created_by', type: 'varchar', length: 50 })
    createdBy: string;
        
    @Column({ name: 'is_deleted', type: 'boolean', default: false})
    is_deleted: boolean;


    //should a region be deleted? not now, just hardcode them.
    @Column({ name: 'deleted_at', type: 'timestamptz', nullable: true, default: null })
    deleted_at: Date;

    @Column({ name: 'deleted_by', type: 'varchar', length: 50, nullable: true, default: null })
    deleted_by: string;

    //make the level_id a foreign key to level_id in levels table
    @ManyToOne(() => Levels, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'level_id' })
    level: Levels;

}

//tenants Entity
@Entity({ name: 'tenants' })
export class Tenants {
    @PrimaryColumn({ name: 'tenant_id', type: 'varchar', length: 50})
    tenant_id: string;
    
    @Column({ name: 'tenant_type', type:'enum', enum: ['farming', 'external'], nullable: false })
    tenant_type: string;

    @Column({ name: 'description', type: 'text'})
    description: string;

    @Column({ name: 'superadmin_id', type: 'varchar', length: 50,default:null})
    superadmin_id: string;

    @Column({ name: 'admin_id', type: 'varchar', length: 50, default:null})
    admin_id: string;
    
    @Column({ name: 'created_at', type: 'timestamptz', default: () => 'now()' })
    createdAt: Date;
        
    @Column({ name: 'is_suspended', type: 'boolean', default: false})
    is_deleted: boolean;

    //should a tenant be deleted? it should be suspendedfor now 
    @Column({ name: 'suspended_at', type: 'timestamptz', nullable: true, default: null })
    deleted_at: Date;

    //make the superadmin_id a foreign key to id in superadmin table
    @ManyToOne(() => SuperAdmin, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'superadmin_id' })
    superadmin: SuperAdmin;

    //make the admin_id a foreign key to id in users table
    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'admin_id' })
    admin: User;
}

//farms Entity
@Entity({ name: 'farms' })
export class Farms {
    @PrimaryColumn({ name: 'id', type: 'varchar', length: 50})
    farm_id: string;

    @Column({ name: 'display_name', nullable: false, type: 'text'})
    display_name: string;

    @Column({ name: 'legal_name', nullable: false, type: 'text'})
    legal_name: string;

    @Column({ name: 'address', nullable: false, type: 'text'})
    address: string;

    @Column({ name: 'size', nullable: false, type: 'decimal'})
    size: Decimal128;

    @Column({ name: 'registeration_date', nullable: false, type: 'timestamptz', default: () => 'now()' })
    registeration_date: Date;
        
    @Column({ name: 'updated_at', type: 'timestamptz', default: () => 'now()'})
    is_deleted: Date;

    @Column({ name: 'display_name', nullable: false, type: 'number'})
    total_fields_count: number;


    //Need to discuss with Utkarsh, what the deletion policy for farms is
    // @Column({ name: 'deleted_at', type: 'timestamptz', nullable: true, default: null })
    // deleted_at: Date;

    // @Column({ name: 'deleted_by', type: 'varchar', length: 50, nullable: true, default: null })
    // deleted_by: string;
}

//fields Entity
@Entity({ name: 'fields' })
export class Fields {
    @PrimaryColumn({ name: 'field_id', type: 'varchar', length: 50})
    field_id: string;

    @Column({ name: 'farm_id', type: 'varchar', length: 50})
    farm_id: string;

    @Column({ name: 'display_name', nullable: false, type: 'text'})
    display_name: string;

    @Column({ name: 'legal_name', nullable: false, type: 'text'})
    legal_name: string;

    @Column({ name: 'address', nullable: false, type: 'text'})
    address: string;

    @Column({ name: 'size', nullable: false, type: 'decimal'})
    size: Decimal128;

    @Column({ name: 'registeration_date', nullable: false, type: 'timestamptz', default: () => 'now()' })
    registeration_date: Date;
        
    @Column({ name: 'updated_at', type: 'timestamptz', default: () => 'now()'})
    is_deleted: Date;

    //column to show who added the field
    @Column({ name: 'created_by', type: 'varchar', length: 50, nullable: false })
    created_by: string;

    @Column({ name: 'display_name', nullable: false, type: 'number'})
    total_fields_count: number;


    //this also allows to retive farm details when fetching field details
    @ManyToOne(() => Farms, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'farm_id' })
    farm: Farms;

    //make the added_by a foreign key to id in users table
    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'created_by' })
    user: User;

}

//farm_owner Entity
@Entity({ name: 'farm_owners' })
export class FarmOwner {
    @PrimaryColumn({ name: 'id', type: 'varchar', length: 50})
    id: string;

    @PrimaryColumn({ name: 'farm_id', type: 'varchar', length: 50})
    farm_id: string;
        
    @Column({ name: 'created_at', type: 'timestamptz', default: () => 'now()'})
    is_deleted: Date;

    //this also allows to retive farm details when fetching field details
    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id' })
    user: User;

}

//user_region Entity
@Entity({ name: 'user_region' })
export class UserRegion {
    @PrimaryColumn({ name: 'id', type: 'varchar', length: 50})
    id: string;

    @PrimaryColumn({ name: 'region_id', type: 'varchar', length: 50})
    region_id: string;
        
    @Column({ name: 'updated_at', type: 'timestamptz', default: () => 'now()'})
    is_deleted: Date;


    //this also allows to retive farm details when fetching field details
    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id' })
    user: User;

    //this also allows to retive farm details when fetching field details
    @ManyToOne(() => Regions, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'region_id' })
    region: Regions;

}

//tenant_field_year Entity
@Entity({ name: 'tenant_field_year' })
export class TenantFieldYear {
    @PrimaryColumn({ name: 'tenant_field_id', type: 'varchar', length: 50})
    tenant_field_id: string;

    @PrimaryColumn({ name: 'tenant_id', type: 'varchar', length: 50})
    tenant_id: string;

    @PrimaryColumn({ name: 'field_id', type: 'varchar', length: 50})
    field_id: string;
        
    @Column({ name: 'created_at', type: 'boolean', default: false})
    is_deleted: boolean;

    @Column({ name: 'created_by', type: 'varchar', nullable: false})
    id: string;


    @ManyToOne(() => Tenants, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id' })
    user: Tenants;

    
    @ManyToOne(() => Fields, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'region_id' })
    region: Fields;

}
