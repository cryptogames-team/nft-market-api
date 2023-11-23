import { ApiProperty } from "@nestjs/swagger";
import { Cart } from "src/cart/entities/cart.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({name: 'user'})
@Unique(['user_name'])
export class User extends BaseEntity {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    user_id: number;

    @ApiProperty()
    @Column()
    user_name: string;

    @ApiProperty()
    @Column()
    profile_image: string;


    @OneToMany(type => Cart, cart => cart.user_id, {eager: false})
    cart: Cart[]
}