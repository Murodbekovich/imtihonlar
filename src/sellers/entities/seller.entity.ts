import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('sellers')
export class SellerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  shopName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
