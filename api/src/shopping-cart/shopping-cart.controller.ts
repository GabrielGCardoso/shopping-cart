import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';

@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) { }

  @Post()
  create(@Body() createShoppingCartDto) {
    return this.shoppingCartService.create(createShoppingCartDto);
  }

  @Post(':id/product')
  addProduct(@Param('id') id: number, @Body() product) {
    return this.shoppingCartService.addProduct(id, product);
  }

  @Get()
  findAll() {
    return this.shoppingCartService.findAll();
  }

  @Delete(':id/product/:productId')
  removeProduct(@Param('id') id: string, @Param('productId') productId: string) {
    return this.shoppingCartService.removeProduct(+id, productId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shoppingCartService.findOne(+id);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.shoppingCartService.deleteShoppingCart(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateShoppingCartDto) {
  //   return this.shoppingCartService.update(+id, updateShoppingCartDto);
  // }

}
