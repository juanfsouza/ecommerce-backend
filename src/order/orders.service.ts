import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async checkout(userId: number, totalAmount: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    
    if (!user) {
      throw new Error('User not found');
    }

    if (user.balance < totalAmount) {
      throw new Error('Insufficient balance');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { balance: user.balance - totalAmount },
    });

    return updatedUser;
  }
}
