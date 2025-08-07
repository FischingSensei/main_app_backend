import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { randomUUID } from "crypto";
import { HydratedDocument } from "mongoose";
import { TokensSchema } from "src/auth/schema/tokens.schema";

export type UserDocument = HydratedDocument<UserSchema>;

@Schema()
export class UserSchema
{
    @Prop({
        type: String,
        default: () => {
            return randomUUID();
        }
    })
    _id!: String;

    @Prop({ required: true })
    firstname: String;

    @Prop({ required: true })
    lastname: String;

    @Prop({ required: true })
    password: String;

    @Prop({ required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/.+@.+\..+/, 'Adresse email invalide'],
    })
    email: string;

    @Prop()
    tokens: TokensSchema;
};

export const userSchema = SchemaFactory.createForClass(UserSchema);