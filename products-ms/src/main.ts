import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Config from './config/config';
const config = Config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(config.port);
}
bootstrap();
