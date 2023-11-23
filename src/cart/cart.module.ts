import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { UserModule } from 'src/user/user.module';
import { TypeOrmExModule } from 'src/core/typeorm-ex.module';
import { CartRepository } from './repositories/cart.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([CartRepository]),
    UserModule
  ],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
