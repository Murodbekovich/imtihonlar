import { Controller, Post, Get, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { MakePaymentDto } from './dto/make-payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  pay(@Body() dto: MakePaymentDto) {
    return this.paymentsService.pay(dto);
  }

  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }
}
