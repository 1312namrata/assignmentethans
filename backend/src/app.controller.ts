import { Controller, Get, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import type { Request, Response } from 'express';
import { AppService } from './app.service';
import { OidcAuthGuard, RoleGuard } from './auth/auth.guard';
import { Role } from './auth/auth.decorators';
import { RoleResolverInterceptor } from './db/db.Interceptor';

@UseGuards(OidcAuthGuard)
@Controller("/")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }
  @Get()
  root(@Req() req: Request, @Res() res: Response) {
    if (req.oidc?.isAuthenticated()) {
      return res.redirect(process.env.POST_LOGIN_REDIRECT_URL ?? '/')
    } else {
      return res.redirect('/login');
    }
  }
  
  @Get('/profile')
  getProfile(@Req() req: Request) {
    return req.oidc.user;
  }

  @UseGuards(RoleGuard)
  @Role('superadmin')
  @Get('/test')
  async getUserRoles(@Req() req: Request) {
    return { "message": "hello from test", "user": req.oidc.user }
  }

  @Get('/test-interseptor')
  @UseInterceptors(RoleResolverInterceptor)
  async testInterseptor(@Req() req: Request) {
    return { "message": "hello from test interseptor", "user": req.oidc.user, "userType": req['userType'], "userId": req['userId'] }
  }
}
