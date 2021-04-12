import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from '../product/product.entity'

@Injectable()

export class ProductService {
    constructor(
        @Inject('PRODUCT_REPOSITORY')
        private productRepository: Repository<Product>,
    ) { }
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

    async addProduct(shoppingCartId: number, product_id: number) {
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
