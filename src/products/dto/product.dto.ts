import { IsNotEmpty, IsNumber } from 'class-validator';

export class ProductDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
  price: number;
}
