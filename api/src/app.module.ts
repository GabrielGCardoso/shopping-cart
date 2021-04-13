import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AuthMiddleware } from './middlewares/authMiddleware/auth.middleware';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ProductsModule],
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
