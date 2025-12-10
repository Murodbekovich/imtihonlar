import {Column, Entity,PrimaryGeneratedColumn, OneToOne, JoinColumn,} from 'typeorm';
import { OrderEntity } from '../../orders/entities/order.entity';

export enum ShippingStatus {
  PENDING = 'pending',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
}

@Entity('shippings')
export class ShippingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;

  @Column()
  address: string;

  @Column({
    type: 'enum',
    enum: ShippingStatus,
    default: ShippingStatus.PENDING,
  })
  status: ShippingStatus;

  @OneToOne(() => OrderEntity, (order) => order.shipping, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'orderId' })
  order: OrderEntity;
}
