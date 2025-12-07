import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { OrderEntity } from '../../orders/entities/order.entity';

@Entity('payments')
export class PaymentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;

  @Column({ type: 'decimal' })
  amount: number;

  @Column()
  method: string;

  @OneToOne(() => OrderEntity, (order) => order.payment, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'orderId' })
  order: OrderEntity;
}
