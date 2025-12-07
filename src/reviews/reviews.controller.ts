import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  create(@Body() dto: CreateReviewDto) {
    return this.reviewsService.create(dto);
  }

  @Get('product/:productId')
  findByProduct(@Param('productId') id: number) {
    return this.reviewsService.findByProduct(id);
  }

  @Get()
  findAll() {
    return this.reviewsService.findAll();
  }
}
