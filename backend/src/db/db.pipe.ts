import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { UserService } from "./services/user.service";



@Injectable()
export class UserRegCheckPipe implements PipeTransform {
    constructor (private readonly userService: UserService) {};

    async transform(value: any, metadata: ArgumentMetadata) {
        const { email } = value;
        if (metadata.type === 'body') {
            if (!email) {
                throw new BadRequestException("Missing Required Email Field");
            }
            const userExist = await this.userService.checkUser(email);
            if (userExist) {
                throw new BadRequestException("User Already Exist");
            }
        }
        return value;
    }
}