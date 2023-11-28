import { Body, Controller, Delete, Get, Param, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard } from '@nestjs/passport';
import { CartDto } from './dto/cart.dto';
import { Cart } from './entities/cart.entity';
import UseAuthGuard from 'src/user/auth-guards/use-auth';
import AuthUser from 'src/core/auth-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';


@Controller('cart')
@UseAuthGuard()
@ApiTags('장바구니 API')
export class CartController {
constructor(
    private cartService: CartService
){}

@Post('/')
@ApiOperation({summary: '장바구니 추가 API', description: '장바구니에 아이템을 추가'})
@ApiCreatedResponse({description:'장바구니 추가', type: Cart})
createCart(
    @Body(ValidationPipe) cartDto: CartDto,
    @AuthUser() user: User): Promise<Cart> {
    return this.cartService.createCart(cartDto,user);
}

@Get('/')
@ApiOperation({summary: '내 장바구니 목록 API'})
getMyCart(@AuthUser() user: User): Promise<Cart[]> {
    return this.cartService.getMyCart(user);
}

@Delete('/remove/:cart_id')
@ApiOperation({summary: '내 장바구니 삭제'})
removeCart(
    @Param('cart_id') cart_id: number,
    @AuthUser() user: User): Promise<string> {
        return this.cartService.removeCart(user,cart_id);
}

@Delete('/removeBySaleID/:sale_id')
removeBySaleID(
    @AuthUser()user: User,
    @Param('sale_id')sale_id: number):Promise<string> {
        return this.cartService.removeBySaleID(user,sale_id);
    }


@Delete('/removeAll')
@ApiOperation({summary: '내 장바구니 삭제'})
removeAllCart(
    @AuthUser() user: User): Promise<string> {
        return this.cartService.removeAllCart(user);
}

@Delete('/bySaleId/:sale_id')
@ApiOperation({summary: 'sale_id로 장바구니 모두 삭제'})
removeCartBySaleID(
    @Param('sale_id') sale_id: number,
    @Body('secretKey') scretKey: string
){
    return this.cartService.removeCartBySaleID(sale_id,scretKey);
}

}
