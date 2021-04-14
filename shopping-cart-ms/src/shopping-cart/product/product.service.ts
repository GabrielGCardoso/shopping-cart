import { Inject, HttpService, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository, Like } from 'typeorm';
import { Product } from '../product/product.entity'

import axios from 'axios';
import Config from '../../config/config'
const config = Config()

@Injectable()
export class ProductService {
    baseUrl: string;
    constructor(
        @Inject('PRODUCT_REPOSITORY')
        private productRepository: Repository<Product>,
    ) {
        this.baseUrl = config.productsMs.host;
    }
    async findOneProduct(shoppingCartId: number, productId: string) {
        const product = await this.productRepository.findOne({ where: { shoppingCartId, product_id: Like(`${productId}`) } });
        const { name, price } = await this.getProduct(product);
        return { ...product, name, price }
    }

    async getProduct(product) {
        return await axios.get(`${this.baseUrl}/products/${product.product_id}`).then(resp => resp.data)
    }

    async removeProductFromShoppingCart(shoppingCartId: number, productId: string) {
        const product = await this.findOneProduct(shoppingCartId, productId);
        product.quantity--;
        if (!product.quantity) {
            return this.productRepository.delete({ shoppingCartId, product_id: Like(`${productId}`) });
        }
        return this.productRepository.save(product);
    }

    async addProduct(shoppingCartId: number, product_id: string) {
        const productFound = await this.getProduct({ product_id });
        if (!productFound) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Product Not Found!',
            }, HttpStatus.NOT_FOUND);
        };

        const { name, quantity, price } = productFound;
        const product = await this.findOneProduct(shoppingCartId, product_id);
        if (!product) {
            const newProduct = new Product();
            newProduct.shoppingCartId = shoppingCartId;
            newProduct.product_id = product_id;
            return this.productRepository.save(newProduct);
        }
        product.quantity += 1;
        this.productRepository.save(product);

        return { ...product, name, price }
    }
}
