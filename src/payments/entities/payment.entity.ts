import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('payments')
export class PaymentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;

  @Column()
  amount: number;

  @Column()
  method: string;

  @Column({ default: 'pending' })
  status: string;
}
