import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { auth } from 'express-openid-connect';
import 'dotenv/config';


import * as session from 'express-session';
import * as passport from 'passport';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // enabling automtic validation and transformation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // app.use(helmet({
  //   contentSecurityPolicy: false, // enable and tune if you serve HTML
  // }));



  // app.use('/auth', rateLimit({ windowMs: 60_000, max: 60 }));              // 60/min
  // app.use('/auth/webhook', rateLimit({ windowMs: 60_000, max: 30 })); 
  // app.use('/auth/webhook', bodyParser.json({
  //   verify: (req: any, _res, buf) => { req.rawBody = buf; },
  // }));

  // const prod = process.env.NODE_ENV === 'production';
  // app.use(session({
  //   secret: process.env.SESSION_SECRET!,
  //   resave: false,
  //   saveUninitialized: false,
  //   name: '__Host.sid',
  //   cookie: {
  //     httpOnly: true,
  //     sameSite: 'lax',
  //     secure: prod,                 // true behind HTTPS
  //     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  //   },
  // }));

  // app.use(passport.initialize());
  // app.use(passport.session());


  app.enableCors({
    origin: ['http://localhost:5173'],
    credentials: true,
  });
  const port = process.env.BACKEND_PORT ?? 8000;
  const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SESSION_SECRET || 'a long random string',
    baseURL: process.env.BASE_URL || `http://localhost:${port}`,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_ISSUER,
  };

  app.use(auth(config));
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
