import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { OrderEntity } from '../../orders/entities/order.entity';
import { CategoryEntity } from '../../categories/entities/category.entity';
import { ProductImageEntity } from '../../product-images/entities/product-image.entity';

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

  @ManyToOne(() => CategoryEntity, (category) => category.products, {
    nullable: true,
  })
  category: CategoryEntity;

  @OneToMany(() => ProductImageEntity, (image) => image.product)
  images: ProductImageEntity[];

  @ManyToMany(() => OrderEntity)
  orders: OrderEntity[];

  @CreateDateColumn()
  createdAt: Date;
}