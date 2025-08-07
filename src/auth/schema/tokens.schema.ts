import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type tokensDocument = HydratedDocument<TokensSchema>

@Schema()
export class TokensSchema {
    @Prop()
    refresh_token: string;

    @Prop()
    access_token: string;

    @Prop()
    created_at?: string;

    @Prop()
    outdated_at?: string;
}

export const tokensSchema = SchemaFactory.createForClass(TokensSchema);