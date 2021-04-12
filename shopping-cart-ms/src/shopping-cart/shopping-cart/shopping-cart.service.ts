import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ShoppingCart } from '../shopping-cart.entity'
import { Product } from '../product.entity'

@Injectable()
export class ShoppingCartService {
    constructor(
        @Inject('SHOPPING_CART_REPOSITORY')
        private shoppingCartRepository: Repository<ShoppingCart>,
        @Inject('PRODUCT_REPOSITORY')
        private productRepository: Repository<Product>,
    ) { }

    async findAll(): Promise<ShoppingCart[]> {
        return this.shoppingCartRepository.find({ relations: ['products'] });
    }

    async findOne(cartId: number): Promise<ShoppingCart> {
        return this.shoppingCartRepository.findOne({ relations: ['products'], where: { shoppingCartId: cartId } });
    }

    async create(shoppingCartData) {
        const shoppingCart = new ShoppingCart();
        shoppingCart.userId = shoppingCartData.user_id;

        return this.shoppingCartRepository.save(shoppingCart);
    }


    async findOneProduct(shoppingCartId: number, productId: number) {
        return await this.productRepository.findOne({ where: { productId, shoppingCartId } });
    }

    async removeProductFromShoppingCart(shoppingCartId: number, productId: number) {
        const product = await this.findOneProduct(shoppingCartId, productId);
        product.quantity--;
        if (!product.quantity) {
            return this.productRepository.delete({ shoppingCartId, productId });
        }
        return this.productRepository.save(product);
    }

    async addProduct(shoppingCartId: number, { product_id }) {
        const product = await this.findOneProduct(shoppingCartId, product_id);
        if (!product) {
            const newProduct = new Product();
            newProduct.shoppingCartId = shoppingCartId;
            newProduct.productId = product_id;
            return this.productRepository.save(newProduct);
        }
        product.quantity += 1;
        return this.productRepository.save(product);
    }
}
