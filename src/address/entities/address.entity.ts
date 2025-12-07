import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('address')
export class AddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  region: string;

  @Column({ nullable: true })
  city: string;

  @Column()
  street: string;

  @Column()
  home: string;
}
