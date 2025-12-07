import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  totalPrice: number;

  @Column({ default: 'PENDING' })
  status: string;

  @Column()
  addressId: number;

  @Column()
  shippingMethod: string;

  @CreateDateColumn()
  createdAt: Date;
}
