import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { PageService } from 'src/etc/service/page/page.service';
import { CreatePenjualanDto } from './dto/create-penjualan.dto';
import { CreatePenjualanBayarDto } from './dto/penjualan-bayar.dto';
import { CreatePenjualanItemDto } from './dto/penjualan-item.dto';
import { UpdatePenjualanDto } from './dto/update-penjualan.dto';
import { PenjualanBayar } from './entities/penjualan-bayar.entity';
import { PenjualanItem } from './entities/penjualan-item.entity';
import { Penjualan } from './entities/penjualan.entity';

@Injectable()
export class PenjualanService extends PageService { // pagenation
  // export class PenjualanService {
  constructor(
    @InjectModel(Penjualan.name) private penjualanRepo: Model<Penjualan>,
    @InjectModel(PenjualanItem.name) private penjualanItemRepo: Model<PenjualanItem>,
    @InjectModel(PenjualanBayar.name) private penjualanBayarRepo: Model<PenjualanBayar>,
    @InjectConnection() public MongoDbConnection: Connection
  ) {
    super() // pagenation
  }
  create(createPenjualanDto: CreatePenjualanDto) {
    return this.penjualanRepo.create(createPenjualanDto);
  }

  createItem(createPenjualanItemDto: CreatePenjualanItemDto) {
    return this.penjualanItemRepo.create(createPenjualanItemDto);
  }

  createBayar(createPenjualanBayarDto: CreatePenjualanBayarDto) {
    return this.penjualanBayarRepo.create(createPenjualanBayarDto);
  }


  findAll(req_body) { // pagenation
    return this.generatePage(req_body, Penjualan.name, this.MongoDbConnection)
  }

  async findOne(id: number) {

    let result = await this.penjualanRepo.findOne({ id: id })
    if (result) {
      return result
    } else {
      return ({ message: "data not found" })
    }

  }

  update(id: number, updatePenjualanDto: UpdatePenjualanDto) {
    updatePenjualanDto.id = id
    return this.penjualanRepo.updateOne({ id: id }, updatePenjualanDto)
  }

  async remove(id: number) {
    return this.penjualanRepo.deleteOne({ id: id })
  }
}
