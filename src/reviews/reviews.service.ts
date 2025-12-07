import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewEntity } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly repo: Repository<ReviewEntity>,
  ) {}

  create(dto: CreateReviewDto) {
    return this.repo.save(dto);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  findByProduct(productId: number) {
    return this.repo.find({ where: { productId } });
  }

  update(id: number, dto: UpdateReviewDto) {
    return this.repo.update(id, dto);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
