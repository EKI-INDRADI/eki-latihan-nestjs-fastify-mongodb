import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User, UserSchema } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { ExistValidator } from './etc/validator/exist-validator';
import { UniqueValidator } from './etc/validator/unique-validator';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Produk, ProdukSchema } from './produk/entities/produk.entity';
import { ProdukModule } from './produk/produk.module';
import { Penjualan, PenjualanSchema } from './penjualan/entities/penjualan.entity';
import { PenjualanItem, PenjualanItemSchema } from './penjualan/entities/penjualan-item.entity';
import { PenjualanBayar, PenjualanBayarSchema } from './penjualan/entities/penjualan-bayar.entity';
import { PenjualanModule } from './penjualan/penjualan.module';
import { Konsumen, KonsumenSchema } from './konsumen/entities/konsumen';
import { KonsumenModule } from './konsumen/konsumen.module';
import { RekeningModule } from './rekening/rekening.module';
import { Rekening, RekeningSchema } from './rekening/entities/rekening.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://root:masuk123@127.0.0.1:7000/simple_pos?authSource=admin'),
    // MongooseModule.forRoot(`mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`),
    MongooseModule.forFeature([
      // { name: 'User', schema: UserSchema }, == { name: User.name, schema: UserSchema }, // User.name == 'User' ( function name to string )
      { name: User.name, schema: UserSchema },
      { name: Produk.name, schema: ProdukSchema },
      { name: Konsumen.name, schema: KonsumenSchema },
      { name: Rekening.name, schema: RekeningSchema },
      { name: Penjualan.name, schema: PenjualanSchema },
      { name: PenjualanItem.name, schema: PenjualanItemSchema },
      { name: PenjualanBayar.name, schema: PenjualanBayarSchema },
    ]),
    UserModule,
    AuthModule,
    ProdukModule,
    KonsumenModule,
    RekeningModule,
    PenjualanModule
  ],
  controllers: [AppController],
  providers: [AppService, ExistValidator, UniqueValidator]
})
export class AppModule { }
