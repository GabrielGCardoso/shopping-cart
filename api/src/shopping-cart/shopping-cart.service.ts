import { Injectable, HttpService } from '@nestjs/common';

import { AxiosResponse } from 'axios'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators';

import Config from '../config/config'
const config = Config()
console.log(config.shoppingCartMs.host)

@Injectable()
export class ShoppingCartService {
  baseUrl: string;
  constructor(private readonly httpService: HttpService) {
    this.baseUrl = config.shoppingCartMs.host;
  }
  create(createShoppingCartDto) {
    return this.httpService.post(`${this.baseUrl}/shopping-cart`, createShoppingCartDto)
      .pipe(
        map(response => response.data)
      );
  }


  findAll(): Observable<AxiosResponse<any>> {
    return this.httpService.get(`${this.baseUrl}/shopping-cart`)
      .pipe(
        map(response => response.data)
      );
  }


  addProduct(cartId: number, productDt) {
    return this.httpService.post(`${this.baseUrl}/shopping-cart/${cartId}/product`, productDt)
      .pipe(
        map(response => response.data)
      );
  }

  removeProduct(id: number, productId) {
    return this.httpService.delete(`${this.baseUrl}/shopping-cart/${id}/product/${productId}`)
      .pipe(
        map(response => response.data)
      );
  }

  // findOne(id: number) {
  //   return this.httpService.get(`${this.baseUrl}/shopping-cart/${id}`)
  //     .pipe(
  //       map(response => response.data)
  //     );
  // }

  // update(id: number, updateShoppingCartDto) {
  //   return this.httpService.put(`${this.baseUrl}/shopping-cart/${id}`)
  //     .pipe(
  //       map(response => response.data)
  //     );
  // }

  // remove(id: number) {
  //   return this.httpService.delete(`${this.baseUrl}/shopping-cart/${id}`)
  //     .pipe(
  //       map(response => response.data)
  //     );
  // }


}
