import { Module } from '@nestjs/common';
import { RekeningService } from './rekening.service';
import { RekeningController } from './rekening.controller';
import { Rekening, RekeningSchema } from './entities/rekening.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Rekening])
    MongooseModule.forFeature([{ name: Rekening.name, schema: RekeningSchema }])
  ],
  controllers: [RekeningController],
  providers: [RekeningService]
})
export class RekeningModule { }
