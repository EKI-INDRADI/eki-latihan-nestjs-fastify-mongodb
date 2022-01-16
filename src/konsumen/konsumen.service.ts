import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { PageService } from 'src/etc/service/page/page.service';
import { CreateKonsumenDto } from './dto/create-konsumen.dto';
import { UpdateKonsumenDto } from './dto/update-konsumen.dto';
import { Konsumen } from './entities/konsumen';

@Injectable()
export class KonsumenService extends PageService {

  constructor(
    @InjectModel(Konsumen.name) private konsumenRepo: Model<Konsumen>,
    @InjectConnection() public MongoDbConnection: Connection

  ) {
    super()
  }

  create(createKonsumenDto: CreateKonsumenDto) {
    return this.konsumenRepo.create(createKonsumenDto)
  }


  findAll(req_body) {
    return this.generatePage(req_body, Konsumen.name, this.MongoDbConnection)
  }

  findOne(id: number) {
    return this.konsumenRepo.findOne({ id: id })
  }

  update(id: number, updateKonsumenDto: UpdateKonsumenDto) {
    // updateKonsumenDto.id = id
    return this.konsumenRepo.updateOne({ id: id }, updateKonsumenDto)
  }

  async remove(id: number) {
    return this.konsumenRepo.deleteOne({ id: id })
  }
}
