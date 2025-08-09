import { UUID } from "crypto";
import { Tokens } from "src/auth/entities/tokens.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    _id!: UUID;
    
    @Column({ nullable: false })
    firstname!: string;

    @Column({  nullable: false })
    lastname!: string;

    @Column({  nullable: false })
    email!: string;

    @Column({ nullable: false })
    tokens: Tokens;
}
