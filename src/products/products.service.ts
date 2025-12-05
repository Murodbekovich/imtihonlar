import { Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: 1,
      name: 'iPhone 14 Pro',
      price: 1200,
      image: '/iphone.png',
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Samsung Galaxy S22',
      price: 900,
      image: '/s22.png',
      rating: 4.5,
    },
  ];

  findAll() {
    return this.products;
  }

  create(dto: CreateProductDto) {
    const newProduct: Product = {
      id: this.products.length + 1,
      rating: dto.rating ?? 5,
      ...dto,
    };

    this.products.push(newProduct);
    return newProduct;
  }
}
