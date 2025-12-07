import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentEntity } from './entities/payment.entity';
import { MakePaymentDto } from './dto/make-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(PaymentEntity)
    private paymentRepo: Repository<PaymentEntity>,
  ) {}

  pay(dto: MakePaymentDto) {
    const payment = this.paymentRepo.create({
      ...dto,
      status: 'PAID',
    });

    return this.paymentRepo.save(payment);
  }

  findAll() {
    return this.paymentRepo.find();
  }
}
