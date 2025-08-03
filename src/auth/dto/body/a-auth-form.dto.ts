import { iAuthForm } from "./i-auth-form.dto";

export abstract class AAuthform implements iAuthForm {
    type!: string;
    email!: string;
    password!: string;
}