import { Body, Controller, Post, Res } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CheckoutDto } from './dto/checkout.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('checkout')
  async checkout(@Body() checkoutDto: CheckoutDto, @Res() res) {
    const { userId, totalAmount } = checkoutDto;

    try {
      const user = await this.ordersService.checkout(userId, totalAmount);
      return res.status(200).json({ success: true, message: 'Purchase completed successfully', user });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
}
