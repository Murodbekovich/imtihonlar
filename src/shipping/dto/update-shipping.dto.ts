import { IsEnum, IsOptional } from 'class-validator';
import { ShippingStatus } from '../entities/shipping.entity';

export class UpdateShippingDto {
  @IsOptional()
  @IsEnum(ShippingStatus)
  status?: ShippingStatus;
}
