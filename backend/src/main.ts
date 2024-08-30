import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const configService = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.use(cookieParser());
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3001', // Replace with the address of your React app
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // credentials: true,
  };
  // Enable CORS with the specified options
  app.enableCors(corsOptions);
  const config = new DocumentBuilder()
    .setTitle('Users')
    .setDescription('The users API description')
    .setVersion('1.0')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);

  // somewhere in your initialization file
}
bootstrap();
