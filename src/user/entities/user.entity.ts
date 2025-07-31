import { UUID } from "crypto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    _id!: UUID;
    
    @Column({ nullable: false })
    _firstname!: string;

    @Column({  nullable: false })
    _lastname!: string;

    @Column({  nullable: false })
    _password!: string;

    @Column({  nullable: false })
    email!: string;

    @Column({  nullable: false })
    _class!: string;
}
