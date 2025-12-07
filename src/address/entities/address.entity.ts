import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

@Entity('addresses')
export class AddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  city: string;

  @Column()
  street: string;

  @ManyToOne(() => UserEntity, (user) => user.addresses, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;
}
