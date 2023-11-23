import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from 'src/utils/swagger-utils';
import { logger } from './utils/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  app.enableCors();
  await app.listen(process.env.PORT);
  logger.info(
    `====================== API Start at ${process.env.PORT} PORT!!======================`
  );
}
bootstrap();
