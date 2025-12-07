export class MakePaymentDto {
  orderId: number;
  method: string; // CARD | PAYPAL
  amount: number;
}
