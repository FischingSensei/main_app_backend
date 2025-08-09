import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Tokens {
    @PrimaryColumn()
    refreshToken: string;

    @Column()
    accessToken: string;
}