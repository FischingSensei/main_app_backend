import { randomUUID } from "crypto";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: randomUUID(),
    },
    _firstname: String,
    _lastname: String,
    _password: String,
    email: String,
});

export default userSchema;