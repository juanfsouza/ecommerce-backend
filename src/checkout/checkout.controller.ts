import { Body, Controller, Post, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { UsersService } from 'src/users/users.service';
import { CheckoutDto } from './dto/checkout.dto';

@Controller('checkout')
export class CheckoutController {
  private readonly logger = new Logger(CheckoutController.name);

  constructor(
    private readonly checkoutService: CheckoutService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async checkout(@Body() checkoutDto: CheckoutDto) {
    this.logger.log(`Dados recebidos: ${JSON.stringify(checkoutDto)}`);

    const { userId, products } = checkoutDto;
    
    if (!userId) {
      throw new HttpException('ID do usuário não fornecido.', HttpStatus.BAD_REQUEST);
    }

    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new HttpException('Usuário não encontrado.', HttpStatus.NOT_FOUND);
    }
  
    const totalAmount = await this.checkoutService.calculateTotal(products);

    if (user.balance < totalAmount) {
      throw new HttpException('Saldo insuficiente.', HttpStatus.BAD_REQUEST);
    }
  
    const paymentSuccess = await this.checkoutService.processPayment(userId, totalAmount);
  
    if (!paymentSuccess) {
      throw new HttpException('Erro ao processar o pagamento.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  
    const updatedUser = await this.usersService.findOne(userId);
  
    return {
      success: true,
      message: 'Compra realizada com sucesso!',
      newBalance: updatedUser.balance,
    };
  }  
}
