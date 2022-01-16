import { Module } from '@nestjs/common';
import { PenjualanService } from './penjualan.service';
import { PenjualanController } from './penjualan.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { Penjualan, PenjualanSchema } from './entities/penjualan.entity';
import { PenjualanItem, PenjualanItemSchema } from './entities/penjualan-item.entity';
import { PenjualanBayar, PenjualanBayarSchema } from './entities/penjualan-bayar.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports : [
    // TypeOrmModule.forFeature([Penjualan,PenjualanItem, PenjualanBayar])
    MongooseModule.forFeature([
      { name: Penjualan.name, schema: PenjualanSchema },
      { name: PenjualanItem.name, schema: PenjualanItemSchema },
      { name: PenjualanBayar.name, schema: PenjualanBayarSchema }
    ]),
  ],
  controllers: [PenjualanController],
  providers: [PenjualanService]
})
export class PenjualanModule {}
