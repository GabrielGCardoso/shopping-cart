import { ValidationError, ValidationPipe } from '@nestjs/common';
import { ValidationException } from './middlewares/validationMiddlware/validation.exception';
import { ValidationFilter } from './middlewares/validationMiddlware/validation';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './middlewares/exceptionHandler';
import Config from './config/config';
const config = Config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalFilters(new ValidationFilter());
  app.useGlobalPipes(new ValidationPipe({
    skipMissingProperties: false,
    exceptionFactory: (errors: ValidationError[]) => {
      const messages = errors.map((error) => {
        return {
          error: `${error.property} has wrong value ${error.value}.`,
          message: Object.values(error.constraints).join(''),
        }
      })
      return new ValidationException(messages);
    }
  }));
  await app.listen(config.port);
}
bootstrap();
