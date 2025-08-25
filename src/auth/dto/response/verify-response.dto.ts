import { Tokens } from "src/auth/entities/tokens.entity";
import { AAuthResponseDto } from "./Aauth-response.dto";

export class VerifyResponseDto extends AAuthResponseDto {
    body: {
        _id: string,
        tokens: Tokens;
    };
}