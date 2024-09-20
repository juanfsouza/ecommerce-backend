import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HashingService } from 'common/hashing.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashingService: HashingService,
  ) {}

  async register(email: string, password: string, name: string) {
    // Verifica se o e-mail já está em uso
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
  
    if (existingUser) {
      throw new HttpException('E-mail já está em uso.', HttpStatus.BAD_REQUEST);
    }
  
    const hashedPassword = await this.hashingService.hashPassword(password);
    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        balance: 100,
      },
    });
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.UNAUTHORIZED);
    }
    const isPasswordValid = await this.hashingService.comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException('Senha inválida', HttpStatus.UNAUTHORIZED);
    }
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        balance: user.balance,
      },
    };
  }
}
