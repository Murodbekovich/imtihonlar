import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength, IsEnum, IsOptional } from 'class-validator';
import { Role } from 'src/common/enums/role.enum';

export class RegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  @IsEmail()
  email: string;
  
  @ApiProperty()
  @MinLength(6)
  password: string;

  @ApiProperty({ enum: Role, required: false })
  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}