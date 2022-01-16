import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { PageService } from 'src/etc/service/page/page.service';
import { CreateRekeningDto } from './dto/create-rekening.dto';
import { UpdateRekeningDto } from './dto/update-rekening.dto';
import { Rekening } from './entities/rekening.entity';

@Injectable()
export class RekeningService extends PageService {
  constructor(
    @InjectModel(Rekening.name) private rekeningRepo: Model<Rekening>,
    @InjectConnection() public MongoDbConnection: Connection
  ) {
    super()
  }
  create(createRekeningDto: CreateRekeningDto) {
    return this.rekeningRepo.create(createRekeningDto)
  }

  findAll(req_body) {
    return this.generatePage(req_body, Rekening.name, this.MongoDbConnection)
  }

  findOne(id: number) {
    return this.rekeningRepo.findOne({ id: id });
  }

  update(updateRekeningDto: UpdateRekeningDto) {
    return this.rekeningRepo.updateOne({ id: updateRekeningDto.id }, updateRekeningDto);
  }

  async remove(id: number) {
    return this.rekeningRepo.deleteOne({id : id})
  }
}
