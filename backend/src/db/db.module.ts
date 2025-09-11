import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { DbService } from './db.service';
import { DbController } from './db.controller';
import  { TenantController } from './db.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission, RolePermission, Role, User,  UserRole, SuperAdmin, SuperAdminRole, Regions, Levels, Tenants } from './db.entities';
import { DemoHelloSamyakMiddleware, DemoMiddleWare, LoggerMiddleware } from './db.middleware';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserService } from './services/user.service';
import { SuperAdminService } from './services/superadmin.service';
import { UserController } from './controller/user.controller';
import { SuperAdminController } from './controller/superadmin.controller';
import { AppLogger } from './logger.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'elaniti-app.cz62iiumkx88.eu-north-1.rds.amazonaws.com',
      port: 5432,
      username: 'postgres',
      password: 'Elaniti2025',
      database:  'elanitiApp',
      synchronize: false,
      extra: {
        ssl: {
          rejectUnauthorized: false, // dev only — accepts server cert without verifying CA
        },
      },
      entities: [User, Tenants,  Role, Permission, Levels, Regions, Tenants,UserRole, RolePermission, SuperAdmin, SuperAdminRole],
    }),
    TypeOrmModule.forFeature([ // "Hey, in this module (like UserModule, DbModule, etc.), I'm going to use repositories for these entities. Please get them ready for me."
      User,                    // it will make ready of all the repos so that we can use.
      Tenants,
      Role,
      Permission,
      UserRole,
      Levels,
      Regions,
      Tenants,
      RolePermission,
      SuperAdmin,
      SuperAdminRole
    ]),
    forwardRef(() => AuthModule) 
  ],
  exports:[TypeOrmModule, UserService, SuperAdminService, AppLogger], // It makes TypeOrmModule (and all the repositories you registered with it using .forFeature([...])) available to other modules that import your module.
  providers: [DbService, UserService, AuthService, SuperAdminService, AppLogger],
  controllers: [DbController, UserController, SuperAdminController,TenantController]
})
export class DbModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DemoMiddleWare).forRoutes({path: 'db', method: RequestMethod.GET});
    consumer.apply(DemoHelloSamyakMiddleware).forRoutes({path: "db/samyak", method: RequestMethod.GET});
    // consumer.apply(UserRegCheckMiddleware).forRoutes({path: "user/create-user", method: RequestMethod.POST});
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
