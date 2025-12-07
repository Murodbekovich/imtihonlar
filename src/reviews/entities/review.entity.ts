import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('reviews')
export class ReviewEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  productId: number;

  @Column()
  rating: number;

  @Column()
  comment: string;
}
