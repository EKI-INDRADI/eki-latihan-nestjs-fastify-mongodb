import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
// import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports : [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    // TypeOrmModule.forFeature([User]) // mengaktifkan seluruh entity user

  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService] // agar bisa digunakan di tempat lain harus export  (keperluan jwt)
})
export class UserModule {}
