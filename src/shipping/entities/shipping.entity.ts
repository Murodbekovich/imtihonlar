import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('shipping')
export class ShippingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  estimatedDays: string;
}
