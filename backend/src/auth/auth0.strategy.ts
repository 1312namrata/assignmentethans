import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-auth0';
import { Injectable } from '@nestjs/common';
@Injectable()
export class Auth0Strategy extends PassportStrategy(Strategy, 'auth0') {
  constructor() {
    super({
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      callbackURL: process.env.AUTH0_CALLBACK_URL,
      scope: 'openid profile email',
      state: false, // CSRF protection
    });
  }

  // Returned value is stored in the session (via serializeUser)
  validate(_accessToken: string, _refreshToken: string, _extra: any, profile: any) {
    console.log(_accessToken);
    console.log(profile);
    return {
      auth0Id: profile.id,                                   // e.g. "auth0|abc123"
      email: profile.emails?.[0]?.value ?? null,
      name: profile.displayName ?? profile.nickname ?? null,
      picture: profile.picture ?? null,
    }

    // const auth = {
    //   accessToken: _accessToken,
    //   refreshToken: _refreshToken,
    //   user_profile: profile
    // }
    // return { user, auth };
  }
}