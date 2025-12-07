import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repo: Repository<ProductEntity>,
  ) {}

  create(dto: any) {
    const product = this.repo.create(dto);
    return this.repo.save(product);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  async update(id: number, dto: any) {
    const product = await this.repo.findOneBy({ id });
    if (!product) throw new NotFoundException('Product not found');

    Object.assign(product, dto);
    return this.repo.save(product);
  }

  async remove(id: number) {
    const product = await this.repo.findOneBy({ id });
    if (!product) throw new NotFoundException('Product not found');

    return this.repo.remove(product);
  }
}
