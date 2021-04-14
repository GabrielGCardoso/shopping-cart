import { Controller, Get, Post, Body, Patch, Param, Delete, HttpService } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';

@Controller('shopping-cart')
export class ShoppingCartController {
    constructor(private readonly shoppingCartService: ShoppingCartService) { }

    @Get()
    getAll() {
        return this.shoppingCartService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.shoppingCartService.findOne(+id);
    }

    @Delete(':cartId/product/:productId')
    remove(@Param('cartId') cartId: number, @Param('productId') productId: string) {
        return this.shoppingCartService.removeProductFromShoppingCart(+cartId, productId);
    }

    @Post()
    create(@Body() shoppingData) {
        return this.shoppingCartService.create(shoppingData);
    }

    @Post(':cartId/product')
    addProduct(@Param('cartId') cartId: number, @Body() productData) {
        return this.shoppingCartService.addProduct(+cartId, productData);
    }
}
