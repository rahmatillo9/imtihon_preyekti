import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from "dotenv";

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 app.useGlobalPipes(new ValidationPipe ({
  forbidNonWhitelisted: true,
  transform: true
 }),
)
  app.enableCors({
    origin: "*"
  })
  const config = new DocumentBuilder()
    .setTitle('Marks API')
    .setDescription('API for managing marks')
    .setVersion('1.0')
    .addBearerAuth() 
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();



