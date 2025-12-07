import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('reviews')
export class ReviewEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column()
  userId: number;

  @Column()
  username: string;

  @Column()
  rating: number; // 1 to 5

  @Column('text')
  comment: string;

  @CreateDateColumn()
  createdAt: Date;
}
