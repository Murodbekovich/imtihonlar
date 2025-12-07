import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentEntity } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly repo: Repository<PaymentEntity>,
  ) {}

  create(dto: CreatePaymentDto) {
    const payment = this.repo.create(dto);
    return this.repo.save(payment);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async remove(id: number) {
    const payment = await this.findOne(id);
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    return this.repo.remove(payment);
  }
}
