import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('payments')
export class PaymentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;

  @Column()
  method: string; // CARD | PAYPAL

  @Column()
  amount: number;

  @Column({ default: 'PAID' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
