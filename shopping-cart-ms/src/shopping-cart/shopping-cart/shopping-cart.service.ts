import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
// import { Product } from '../product/product.entity';
import { ShoppingCart } from './shopping-cart.entity'
import { ProductService } from '../product/product.service';

@Injectable()
export class ShoppingCartService {
    constructor(
        @Inject('SHOPPING_CART_REPOSITORY')
        private shoppingCartRepository: Repository<ShoppingCart>,
        @Inject('ProductService')
        private productService: ProductService,
    ) { }

    async findAll(): Promise<ShoppingCart[]> {
        return this.shoppingCartRepository.find({ relations: ['products'] });
    }

    async findOne(cartId: number) {
        return this.shoppingCartRepository.findOne({ relations: ['products'], where: { shoppingCartId: cartId } });
    }

    async create(shoppingCartData) {
        const shoppingCart = new ShoppingCart();
        shoppingCart.userId = shoppingCartData.user_id;

        return this.shoppingCartRepository.save(shoppingCart);
    }

    async removeProductFromShoppingCart(shoppingCartId: number, productId: string) {
        return this.productService.removeProductFromShoppingCart(shoppingCartId, productId);
    }

    async addProduct(shoppingCartId: number, { product_id }) {
        return this.productService.addProduct(shoppingCartId, product_id);
    }

}
