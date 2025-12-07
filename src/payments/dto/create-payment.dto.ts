export class CreatePaymentDto {
  orderId: number;
  amount: number;
  method: string;
  status?: string;
}
