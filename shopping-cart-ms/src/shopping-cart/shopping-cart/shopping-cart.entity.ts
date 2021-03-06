import { Entity, Unique, Column, PrimaryGeneratedColumn, Index, OneToMany } from 'typeorm';
import { Product } from '../product/product.entity';

@Entity()
export class ShoppingCart {
    @PrimaryGeneratedColumn()
    shoppingCartId: number;

    @Index('unique')
    @Column()
    userId: number;

    @OneToMany(() => Product, product => product.shoppingCart)
    products: Product[];
}