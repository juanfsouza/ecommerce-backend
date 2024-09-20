import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { HashingService } from 'common/hashing.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  providers: [AuthService, PrismaService, HashingService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
