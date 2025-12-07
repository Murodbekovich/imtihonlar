import { IsNumber, IsArray } from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  productIds: number[];

  @IsNumber()
  totalPrice: number;
}
