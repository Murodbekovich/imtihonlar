import { IsNumber, IsString } from 'class-validator';

export class CreateShippingDto {
  @IsNumber()
  orderId: number;

  @IsString()
  address: string;
}
