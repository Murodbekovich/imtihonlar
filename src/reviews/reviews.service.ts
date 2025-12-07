import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewEntity } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewEntity)
    private reviewRepo: Repository<ReviewEntity>,
  ) {}

  create(dto: CreateReviewDto) {
    const review = this.reviewRepo.create(dto);
    return this.reviewRepo.save(review);
  }

  findByProduct(productId: number) {
    return this.reviewRepo.find({
      where: { productId },
      order: { createdAt: 'DESC' },
    });
  }

  findAll() {
    return this.reviewRepo.find();
  }
}
