import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('port') || 5000;

  app.setGlobalPrefix('api');
  app.enableCors();

  await app.listen(PORT, () => {
    console.log("Server is running at:", PORT);
  })
}
bootstrap();
