import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

import { UserEntity } from '../users/entities/user.entity';

@Module({
  imports: [
    ConfigModule, // ✅ MUHIM! Jwt uchun kerak bo‘ladi

    TypeOrmModule.forFeature([UserEntity]),

    JwtModule.registerAsync({
      imports: [ConfigModule], // ✅ BU YERDA BO‘LISHI SHART
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => ({
        secret: cs.get('JWT_SECRET'),
        signOptions: {
          expiresIn: cs.get('JWT_EXPIRES') || '1d',
        },
      }),
    }),
  ],

  controllers: [AuthController],

  providers: [
    AuthService,
    JwtStrategy, // ✅ STRATEGY PROVIDERS ICHIDA BO‘LISHI SHART
  ],

  exports: [AuthService, JwtModule], // ✅ BOSHQA MODULLAR UCHUN
})
export class AuthModule {}
