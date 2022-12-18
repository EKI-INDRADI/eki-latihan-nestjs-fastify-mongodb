import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {

  const app = await NestFactory.create<NestFastifyApplication>( // FASTIFY
    AppModule,
    new FastifyAdapter(),
    { cors: true } // ENABLE CORS
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // biar bisa panggil service / connection / repository pada custom validator
  // https://stackoverflow.com/questions/60062318/how-to-inject-service-to-validator-constraint-interface-in-nestjs-using-class-va


  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidUnknownValues: true,
    transform: true,
    validateCustomDecorators: true,
    transformOptions: {
      enableImplicitConversion: true
    }
  })) // middleware

  //============== SWAGGER
  const configSwagger = new DocumentBuilder()
    .setTitle('OPEN-API POS')
    .setDescription('Documentasi untuk api point of sale')
    .setVersion('1.3')
    .addBearerAuth()
    .build()

  const configCustomSwagger: SwaggerCustomOptions = {
    swaggerOptions: { docExpansion: "none" }
  }
  const swaggerDocument = SwaggerModule.createDocument(app, configSwagger)


  SwaggerModule.setup('api-docs', app, swaggerDocument, configCustomSwagger)
  //============== /SWAGGER

  // await app.listen(3000); // 127.0.0.1/localhost
  await app.listen(3000, '0.0.0.0'); // global ip
}
bootstrap();
