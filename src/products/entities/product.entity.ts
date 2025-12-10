import {Entity,PrimaryGeneratedColumn,Column, ManyToMany, CreateDateColumn,} from 'typeorm';
import { OrderEntity } from '../../orders/entities/order.entity';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @ManyToMany(() => OrderEntity)
  orders: OrderEntity[];

  @CreateDateColumn()
  createdAt: Date;
}
