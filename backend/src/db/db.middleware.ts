import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { UserService } from "./services/user.service";
import { AppLogger } from "./logger.service";

@Injectable()
export class DemoMiddleWare implements NestMiddleware {
    use(req: Request, resp: Response, next: NextFunction) {
        console.log("Hello world");
        next();
    }
}

@Injectable()
export class DemoHelloSamyakMiddleware implements NestMiddleware {
    use(req: Request, resp: Response, next: NextFunction) {
        console.log("Hello Samyak");
        next();
    }
}

@Injectable()
export class UserRegCheckMiddleware implements NestMiddleware {
    constructor(private readonly userService: UserService) { };
    async use(req: Request, resp: Response, next: NextFunction) {
        const email = req.body.email;
        console.log('UserRegCheckMiddleware triggered for:', email);
        const userExist: boolean = await this.userService.checkUser(email);
        if (userExist) {
            console.log("error: " + "User exist");
            return resp.json({ "error": "User already exist" });
        }
        next();
    }
}

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: AppLogger) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const start = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - start;
      const user = (req as any).user?.['userId'] || req.ip;
      const logMessage = `${method} ${originalUrl} → ${res.statusCode} (${duration}ms) by ${user}`;

      this.logger.info(logMessage);
    });

    next();
  }
}