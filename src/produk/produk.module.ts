import { Module } from '@nestjs/common';
import { ProdukService } from './produk.service';
import { ProdukController } from './produk.controller';
import { Produk, ProdukSchema } from './entities/produk.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports : [
    MongooseModule.forFeature([{ name: Produk.name, schema: ProdukSchema }]),
  ],
  controllers: [ProdukController],
  providers: [ProdukService]
})
export class ProdukModule {}
