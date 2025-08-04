import { User } from "src/user/entities/user.entity";
import { AAuthResponseDto } from "./Aauth-response.dto";

export class AuthResponseDto extends AAuthResponseDto {
    body: {
        user: User
    };
}