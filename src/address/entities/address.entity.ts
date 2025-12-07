import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('addresses')
export class AddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column()
  home: string;

  @Column()
  phone: string;
}
