import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Smartphones' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Mobile phones and accessories', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: '📱', required: false })
  @IsString()
  @IsOptional()
  icon?: string;
}