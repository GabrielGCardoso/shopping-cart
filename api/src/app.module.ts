import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AuthMiddleware } from './middlewares/authMiddleware/auth.middleware';
import { ProductsModule } from './products/products.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';

@Module({
  imports: [ProductsModule, ShoppingCartModule],
})
export class AppModule implements NestModule {
  configure(userContext: MiddlewareConsumer) {
    userContext
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'projects', method: RequestMethod.ALL },
      )
  }
}
