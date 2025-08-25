import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type tokensDocument = HydratedDocument<TokensSchema>

@Schema()
export class TokensSchema {
    @Prop()
    refreshToken: string;

    @Prop()
    accessToken: string;
}

export const tokensSchema = SchemaFactory.createForClass(TokensSchema);