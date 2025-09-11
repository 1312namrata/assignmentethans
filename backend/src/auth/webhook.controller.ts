import { Controller, Headers, HttpCode, Post, Req, Body, UnauthorizedException } from '@nestjs/common';
import { DataSource, In, Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { MirrorUserDto } from './mirror-user.dto';
import { User} from "../db/db.entities";
import { Request } from 'express';
import * as crypto from 'crypto';

@Controller('auth/webhook')
export class WebhookController {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  @Post('user-async')
  @HttpCode(204)
  async mirrorUser(
    @Req() req: Request & { rawBody: Buffer },
    @Body() dto: MirrorUserDto,
    @Headers('x-auth0-action-signature') signature: string,
  ) {

    const secret = Buffer.from(process.env.AUTH0_ACTION_WEBHOOK_SECRET!, 'utf8');
    const computed = crypto
      .createHmac('sha256', secret)
      .update(req.rawBody)   // rawBody captured here
      .digest('hex');

    if (!signature || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(computed))) {
      throw new UnauthorizedException('Invalid signature');
    }

    if (!dto?.sub) return;

    await this.userRepo.upsert(
      {
        identitySub: dto.sub,
        email: dto.email ?? `user+noemail-${dto.sub}@local`,
        firstName: dto.first_name ?? '',
        lastName: dto.last_name ?? null
      },
      {
        conflictPaths: ['identitySub'], // unique key for upsert
      },
    );
  }
}
