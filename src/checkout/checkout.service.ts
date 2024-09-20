import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CheckoutService {
  constructor(private readonly prisma: PrismaService) {}

  async calculateTotal(products: { productId: number; quantity: number }[]): Promise<number> {
    let total = 0;
  
    for (const product of products) {
      const productData = await this.getProductById(product.productId);
      total += productData.price * product.quantity;
    }
  
    console.log('Total calculado:', total);
    return total;
  }

  async getProductById(productId: number) {
    return this.prisma.product.findUnique({ where: { id: productId } });
  }

  async processPayment(userId: number, totalAmount: number): Promise<boolean> {
    const user = await this.getUserById(userId);

    if (user.balance >= totalAmount) {
      user.balance -= totalAmount;
      await this.updateUserBalance(userId, user.balance);
      return true;
    }

    return false;
  }

  async getUserById(userId: number) {
    // Busca o usuário no banco de dados
    return this.prisma.user.findUnique({ where: { id: userId } }); // Altere para buscar no banco de dados
  }

  async updateUserBalance(userId: number, newBalance: number) {
    // Atualiza o saldo do usuário no banco de dados
    await this.prisma.user.update({
      where: { id: userId },
      data: { balance: newBalance },
    });
  }
}
