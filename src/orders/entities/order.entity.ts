import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  totalPrice: number;

  @Column({ default: 'pending' })
  status: string;
}