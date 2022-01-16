import { Module } from '@nestjs/common';
import { KonsumenService } from './konsumen.service';
import { KonsumenController } from './konsumen.controller';
import { Konsumen, KonsumenSchema } from './entities/konsumen';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Konsumen.name, schema: KonsumenSchema }
    ]),

  ],
  controllers: [KonsumenController],
  providers: [KonsumenService]
})
export class KonsumenModule { }
