import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/user/entities/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({name: 'cart'})
@Unique(['sale_id','user_id'])
export class Cart extends BaseEntity {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    cart_id: number;

    @ApiProperty()
    @ManyToOne(() => User, user => user.cart, { eager: false })
    @JoinColumn({ name: "user_id" })
    user_id: number;

    @ApiProperty()
    @Column()
    sale_id: number;

    @ApiProperty()
    @Column()
    collection_name: string;

    @ApiProperty()
    @Column()
    nft_name: string

    @ApiProperty()
    @Column()
    nft_image: string;

    @ApiProperty()
    @Column()
    price: string;

}