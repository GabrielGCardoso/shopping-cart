import { Injectable, HttpService } from '@nestjs/common';

import { AxiosResponse } from 'axios'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators';

import Config from '../config/config'
const config = Config()
console.log(config.shoppingCartMs.host)

@Injectable()
export class ProductsService {
  baseUrl: string;
  constructor(private readonly httpService: HttpService) {
    this.baseUrl = config.productsMs.host;
  }

  async create(createProductDto) {
    return await this.httpService.post(`${this.baseUrl}/products`, createProductDto)
      .pipe(
        map(response => response.data)
      );
  }

  async findAll() {
    const products = await this.httpService.get(`${this.baseUrl}/products`)
      .pipe(
        map(response => response.data)
      )
    return products;
    // products.map(produtos)
  }

  findOne(id: string) {
    return this.httpService.get(`${this.baseUrl}/products/${id}`)
      .pipe(
        map(response => response.data)
      );
  }

  update(id: string, updateProductDto) {
    return this.httpService.patch(`${this.baseUrl}/products/${id}`, updateProductDto)
      .pipe(
        map(response => response.data)
      );
  }

  remove(id: string) {
    return this.httpService.delete(`${this.baseUrl}/products/${id}`)
      .pipe(
        map(response => response.data)
      );
  }
}
