import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    credentials: true, // Permitir cookies e credenciais
    allowedHeaders: 'Content-Type, Authorization', // Cabeçalhos permitidos
  });

  // Iniciar o servidor na porta 3001
  await app.listen(3001);
}

bootstrap();
