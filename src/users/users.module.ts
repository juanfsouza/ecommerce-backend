import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { OrdersModule } from 'src/order/orders.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, OrdersModule, AuthModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
