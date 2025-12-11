import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductImageEntity } from '../entities/product-image.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ProductImagesService {
  constructor(
    @InjectRepository(ProductImageEntity)
    private readonly repo: Repository<ProductImageEntity>,
  ) {}

  async upload(productId: number, filename: string, isPrimary: boolean = false) {
    // Agar bu primary bo'lsa, oldingi primaryni o'chirish
    if (isPrimary) {
      await this.repo.update(
        { product: { id: productId }, isPrimary: true },
        { isPrimary: false },
      );
    }

    const image = this.repo.create({
      url: `/uploads/${filename}`,
      isPrimary,
      product: { id: productId },
    });

    return this.repo.save(image);
  }

  async findByProduct(productId: number) {
    return this.repo.find({
      where: { product: { id: productId } },
      order: { isPrimary: 'DESC', createdAt: 'ASC' },
    });
  }

  async setPrimary(id: number) {
    const image = await this.repo.findOne({
      where: { id },
      relations: ['product'],
    });

    if (!image) {
      throw new NotFoundException('Image not found');
    }

    // Boshqa rasmlarni primary emas qilish
    await this.repo.update(
      { product: { id: image.product.id }, isPrimary: true },
      { isPrimary: false },
    );

    // Bu rasmni primary qilish
    image.isPrimary = true;
    return this.repo.save(image);
  }

  async remove(id: number) {
    const image = await this.repo.findOne({ where: { id } });
    if (!image) {
      throw new NotFoundException('Image not found');
    }

    // Faylni diskdan o'chirish
    const filePath = path.join(process.cwd(), 'uploads', path.basename(image.url));
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return this.repo.remove(image);
  }
}