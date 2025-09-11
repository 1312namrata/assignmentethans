// src/auth/auth.module.ts
import { Module ,forwardRef} from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { Auth0Strategy } from './auth0.strategy';
import { JwtStrategy } from './jwt.strategy'; // <- your JWKS one (file name can be jwt.strategy.ts; just match import)
import { DbModule } from '../db/db.module';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    JwtModule.register({
      secret: process.env.APP_JWT_SECRET!,         // add to .env
      signOptions: { expiresIn: '15m' },
    }),
    forwardRef(() => DbModule),
  ],
  controllers: [AuthController],
  
  providers: [AuthService, Auth0Strategy, JwtStrategy],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
