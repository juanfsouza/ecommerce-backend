import { Module } from '@nestjs/common';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { PrismaService } from 'src/prisma/prisma.service';


@Module({
  imports: [PrismaModule, AuthModule, UsersModule],
  controllers: [CheckoutController],
  providers: [CheckoutService, UsersModule, PrismaService],

})
export class CheckoutModule {}
