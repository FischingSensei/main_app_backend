import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { randomUUID } from "crypto";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User
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

    @Prop({ required: true })
    email: String;
};

export const UserSchema = SchemaFactory.createForClass(User);