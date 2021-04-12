import { Column, Entity, Unique, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ShoppingCart } from '../shopping-cart/shopping-cart.entity'

@Entity()
@Unique("shopping_cart_constrain", ["productId", "shoppingCartId"])
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    productId: number;

    @Column()
    shoppingCartId: number;

    @Column({ default: 1 })
    quantity: number;

    @ManyToOne(() => ShoppingCart, shoppingCart => shoppingCart.products)
    @JoinColumn({ name: "shoppingCartId" })
    shoppingCart: ShoppingCart;
}