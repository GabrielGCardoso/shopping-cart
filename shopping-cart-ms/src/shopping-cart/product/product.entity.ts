import { Column, Entity, Unique, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ShoppingCart } from '../shopping-cart/shopping-cart.entity'

@Entity()
@Unique("shopping_cart_constrain", ["id", "shoppingCartId"])
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    product_id: string;

    @Column()
    shoppingCartId: number;

    @Column({ default: 1, type: "double" })
    quantity: number;

    @ManyToOne(() => ShoppingCart, shoppingCart => shoppingCart.products)
    @JoinColumn({ name: "shoppingCartId" })
    shoppingCart: ShoppingCart;
}