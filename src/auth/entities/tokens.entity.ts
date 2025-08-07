import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Tokens {
    @PrimaryColumn()
    refresh_token: string;

    @Column()
    access_token: string;

    @Column()
    created_at: string;

    @Column()
    outdated_at: string;
}