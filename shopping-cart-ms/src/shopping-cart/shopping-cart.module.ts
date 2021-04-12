import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ShoppingCartProviders } from './shopping-cart.providers';
import { ShoppingCartService } from './shopping-cart/shopping-cart.service';
import { ShoppingCartController } from './shopping-cart/shopping-cart.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...ShoppingCartProviders, ShoppingCartService],
  controllers: [ShoppingCartController]
})
export class ShoppingCartModule { }
