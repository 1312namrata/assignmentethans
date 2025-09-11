import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "old-jwt") {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "44441f6c0abf3e5e68999a266d143f64eceb353e60ae3ade857920855b07bf3e0521f0f1b74a8476fd2db3fd08c29bde9fd04222b6f96414fea4be266e92e11f"
        });
    }
    async validate(payload: any) {
        return {
            userId: payload.id,
            email: payload.email,
            roles: payload.roles
        };
    }
}