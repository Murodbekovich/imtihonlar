import { IsNumber } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  orderId: number;

  @IsNumber()
  amount: number;
}
