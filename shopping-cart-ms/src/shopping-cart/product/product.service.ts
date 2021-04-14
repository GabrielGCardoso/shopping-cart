import { Inject, HttpService, Injectable } from '@nestjs/common';
import { Repository, Like } from 'typeorm';
import { Product } from '../product/product.entity'

import { map } from 'rxjs/operators';
import Config from '../../config/config'
const config = Config()

@Injectable()
export class ProductService {
    baseUrl: string;
    constructor(
        @Inject('PRODUCT_REPOSITORY')
        private productRepository: Repository<Product>,
        private readonly httpService: HttpService
    ) {
        this.baseUrl = config.productsMs.host;
    }
    async findOneProduct(shoppingCartId: number, productId: string) {
        return await this.productRepository.findOne({ where: { shoppingCartId, product_id: Like(`${productId}`) } });
    }

    async getProduct(product, cb) {
        return await this.httpService.get(`${this.baseUrl}/products/${product.product_id}`).subscribe(cb)
    }

    async removeProductFromShoppingCart(shoppingCartId: number, productId: string) {
        const product = await this.findOneProduct(shoppingCartId, productId);
        product.quantity--;
        if (!product.quantity) {
            return this.productRepository.delete({ shoppingCartId, product_id: Like(`${productId}`) });
        }
        return this.productRepository.save(product);
    }

    getValueFromResponse({ data }) {
        console.log(data);
    }

    async addProduct(shoppingCartId: number, product_id: string) {
        const result = await this.getProduct({ product_id }, this.getValueFromResponse.bind(this));
        const product = await this.findOneProduct(shoppingCartId, product_id);
        if (!product) {
            const newProduct = new Product();
            newProduct.shoppingCartId = shoppingCartId;
            newProduct.product_id = product_id;
            return this.productRepository.save(newProduct);
        }
        product.quantity += 1;
        return this.productRepository.save(product);
    }
}
