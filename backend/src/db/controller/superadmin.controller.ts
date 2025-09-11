import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { SuperAdminService } from "../services/superadmin.service";
import { Role } from "src/auth/auth.decorators";
import { RoleGuard } from "src/auth/auth.guard";
import { AuthGuard } from "@nestjs/passport";
import { SuperAdminDto } from "../db.dto";
import { Request } from 'express';

@Controller('superadmin')
export class SuperAdminController {
    constructor(
        private readonly superAdminService: SuperAdminService
    ) { }

    @Get("/super-admin/:email")
    async getSuperAdmin(@Param("email") email: string) {
        const result = await this.superAdminService.getSuperAdminService(email);
        console.log(result);
        return { "result": result, "test": "hello", "email": email };
    }

    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Role('superadmin')
    @Post('create-super-admin')
    async createSuperAdmin(@Body() superAdminDto: SuperAdminDto, @Req() req: Request) {
        const superAdminId = req.user?.["userId"];
        const result = await this.superAdminService.CreateSuperAdminService(superAdminDto, superAdminId);
        return ({ "message": "Super Admin Created Sucessfully", "super_admin_details": result });
    }
}