import { CustomRepository } from "src/core/typeorm-ex.decorator";
import { Cart } from "../entities/cart.entity";
import { Repository } from "typeorm";
import { CartDto } from "../dto/cart.dto";
import { ConflictException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { User } from "src/user/entities/user.entity";

@CustomRepository(Cart)
export class CartRepository extends Repository<Cart> {

    async getCartById(cart_id: number): Promise<Cart> {
        const found = await this.findOne({
            where : {cart_id}
        });

        if(!found){
            throw new NotFoundException(`Can't found cart item by ${cart_id}`);
        }

        return found;
    }

    async IsMyCart(user_id: number, cart_id: number ): Promise<Cart> {
                
        await this.getCartById(cart_id);

        const found = await this.findOne({
            where : {
                user_id,
                cart_id
            }
        });

        if(!found){
            throw new NotFoundException(`cart_id : ${cart_id} isn't your cart item`);
        }

        return found;
    }

    async createCart(cartDto: CartDto, user: User): Promise<Cart> {
        const { sale_id, collection_name, nft_name, nft_image, price, asset_id, offer_id, seller} = cartDto;
        const { user_id } = user;
        const cart = this.create({sale_id, collection_name,nft_name,nft_image,price,user_id, asset_id, offer_id, seller});

        try{
            await this.save(cart);
            return cart;
        }catch(error){
            if(error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('This item is already in your shopping cart');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async getMyCart(user: User): Promise<Cart[]> {
        const { user_id } = user;
        const query = this.createQueryBuilder('cart');
        query.where('cart.user_id = :user_id', {user_id});

        const carts = await query.getMany();
        return carts;
    }

    async removeCart(user: User, cart_id: number): Promise<string> {
        const { user_id } = user;

        await this.IsMyCart(user_id,cart_id);

        await this.delete({cart_id});
        return 'delete success';
    }

    async removeAllCart(user: User): Promise<string> {
        const { user_id } = user;

        await this.delete({user_id});
        return 'delete success';
    }

    async removeCartBySaleID(sale_id: number): Promise<string> {
        await this.delete({sale_id});
        return 'delete success';
    }
}