import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewEntity } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly repo: Repository<ReviewEntity>,
  ) {}

  create(dto: CreateReviewDto) {
    const review = this.repo.create(dto);
    return this.repo.save(review);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async remove(id: number) {
    const review = await this.findOne(id);
    if (!review) throw new NotFoundException('Review not found');

    return this.repo.remove(review);
  }
}
