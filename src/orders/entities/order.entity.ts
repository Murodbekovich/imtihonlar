import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { OrderStatus } from '../enums/order-status.enum';
import { PaymentEntity } from 'src/payments/entities/payment.entity';
import { ShippingEntity } from 'src/shipping/entities/shipping.entity';


@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal' })
  totalPrice: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity;

  @OneToOne(() => PaymentEntity, (payment) => payment.order)
  payment: PaymentEntity;

  @OneToOne(() => ShippingEntity, (shipping) => shipping.order)
shipping: ShippingEntity;
}
