import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CartRepository } from './repositories/cart.repository';
import { CartDto } from './dto/cart.dto';
import { Cart } from './entities/cart.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CartService {
    constructor(
        private cartRepository: CartRepository
    ){}

    createCart(cartDto: CartDto, user: User): Promise<Cart> {
        return this.cartRepository.createCart(cartDto,user);
    }

    getMyCart(user: User):Promise<Cart[]> {
        return this.cartRepository.getMyCart(user);
    }

    removeCart(user: User, cart_id: number): Promise<string> {
        return this.cartRepository.removeCart(user,cart_id);
    }

    removeAllCart(user: User): Promise<string> {
        return this.cartRepository.removeAllCart(user);
    }

    removeCartBySaleID(sale_id: number, scretKey: string): Promise<string> {
        if(scretKey !== process.env.DELETE_CART_KET){
            throw new InternalServerErrorException();
        }
        return this.cartRepository.removeCartBySaleID(sale_id);
    }
}
