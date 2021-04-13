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
    this.baseUrl = config.shoppingCartMs.host;
  }

  create(createProductDto) {
    return this.httpService.post(`${this.baseUrl}/products`, createProductDto);
  }

  findAll(): Observable<AxiosResponse<any>> {
    return this.httpService.get(`${this.baseUrl}/products`)
      .pipe(
        map(response => response.data)
      );
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return this.httpService.delete(`${this.baseUrl}/products/${id}`);
  }
}
