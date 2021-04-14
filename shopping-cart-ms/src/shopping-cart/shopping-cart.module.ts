import { Module, HttpModule } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ShoppingCartProviders } from './shopping-cart.providers';
import { ShoppingCartService } from './shopping-cart/shopping-cart.service';
import { ShoppingCartController } from './shopping-cart/shopping-cart.controller';
import { ProductService } from './product/product.service';

@Module({
  imports: [DatabaseModule, HttpModule],
  providers: [...ShoppingCartProviders, ShoppingCartService, ProductService],
  controllers: [ShoppingCartController]
})
export class ShoppingCartModule { }
