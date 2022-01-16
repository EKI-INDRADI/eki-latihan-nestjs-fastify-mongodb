import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { PageService } from 'src/etc/service/page/page.service';
import { CreateProdukDto } from './dto/create-produk.dto';
import { UpdateProdukDto } from './dto/update-produk.dto';
import { Produk } from './entities/produk.entity';

@Injectable()
export class ProdukService extends PageService {
  constructor(
    @InjectModel(Produk.name) private produkRepo: Model<Produk>,
    @InjectConnection() public MongoDbConnection: Connection
  ) {
    super()
  }

  create(createProdukDto: CreateProdukDto) {
    return this.produkRepo.create(createProdukDto)
  }

  findAll(req_body) {
    return this.generatePage(req_body, Produk.name, this.MongoDbConnection)
  }

  findOne(id: number) {
    return this.produkRepo.findOne({ id: id })
  }

  update(id: number, updateProdukDto: UpdateProdukDto) {
    updateProdukDto.id = id
    return this.produkRepo.create(updateProdukDto)
  }

  async remove(id: number) {
    let produk_result = await this.produkRepo.findOne({ id: id })

    if (produk_result) {
      return this.produkRepo.deleteOne({ id: id })
    } else {
      return {
        message : "id not found"
      }
    }

  }



  async GetProduk(req_body: any) {
    let res_json: any = {}

    let getData: any = null
    let getDataCount: any = null

    let aggregateCondition = []

    let req_body_condition: any = {
        ...req_body
    }

    delete req_body_condition.limit
    delete req_body_condition.skip
    delete req_body_condition.page
    delete req_body_condition.sort
    delete req_body_condition.projection

    let req_body_regex_condition: any = {}
    for (let i_a = 0; i_a < Object.keys(req_body_condition).length; i_a++) {
        if (Object.values(req_body_condition)[i_a] == '' || Object.values(req_body_condition)[i_a] == "" || Object.values(req_body_condition)[i_a] == null) {

        } else {
            if (typeof Object.values(req_body_condition)[i_a] == 'string') {
                req_body_regex_condition[Object.keys(req_body_condition)[i_a]] = { $regex: Object.values(req_body_condition)[i_a], $options: 'i' }
            } else if (typeof Object.values(req_body_condition)[i_a] == 'number') {

                req_body_regex_condition[Object.keys(req_body_condition)[i_a]] = Object.values(req_body_condition)[i_a]
            } else {
                req_body_regex_condition[Object.keys(req_body_condition)[i_a]] = Object.values(req_body_condition)[i_a]

            }
        }

    }


    getDataCount = await this.MongoDbConnection.model(Produk.name).count(req_body_regex_condition)

    aggregateCondition.push({ $match: req_body_regex_condition })

    let limit: Number = 10
    let skip: Number = 0


    if (req_body.skip || req_body.limit) {

        limit = (req_body.limit) ? req_body.limit : 10
        let autoSkip = (req_body.limit && req_body.page) ? (req_body.page - 1) * req_body.limit : 0

        if (!req_body.page && req_body.skip) {
            skip = (req_body.skip) ? req_body.skip : autoSkip
        } else {
            skip = autoSkip
        }
        if (skip > 0) {
            aggregateCondition.push({ $skip: skip })
        }
        aggregateCondition.push({ $limit: limit })
    }

    if (req_body.sort) {
        aggregateCondition.push({ $sort: req_body.sort })
    }

    if (req_body.projection) {
        aggregateCondition.push({ $project: req_body.projection })
    }

    getData = await this.MongoDbConnection.model(Produk.name).aggregate(aggregateCondition)

    let total = getDataCount
    res_json.total = total

    if (skip >= 0 && !req_body.page) {
        res_json.page = Math.ceil(Number(skip) / Number(limit)) + 1
    } else {
        res_json.page = req_body.page
    }
    let result = getData

    if (req_body.skip || req_body.limit) {
        let pages = Math.ceil(total / Number(limit))
        res_json.pages = pages
    }

    res_json.data = result

    return res_json
  }


  //=================== MANUAL QUERY
}
