import { Connection, Repository } from 'typeorm';
import { ShoppingCart } from './shopping-cart/shopping-cart.entity';
import { Product } from './product/product.entity';

export const ShoppingCartProviders = [
    {
        provide: 'SHOPPING_CART_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(ShoppingCart),
        inject: ['DATABASE_CONNECTION'],
    },
    {
        provide: 'PRODUCT_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Product),
        inject: ['DATABASE_CONNECTION'],
    }
];
