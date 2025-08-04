import { UUID } from "crypto";
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
}
