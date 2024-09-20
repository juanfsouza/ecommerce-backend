import { IsNotEmpty, IsNumber } from 'class-validator';

export class CheckoutDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  totalAmount: number;
}
