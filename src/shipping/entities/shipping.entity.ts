import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('shipping')
export class ShippingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;

  @Column()
  address: string;

  @Column({ default: 'pending' })
  status: string;

  @Column({ nullable: true })
  phone: string;
}
