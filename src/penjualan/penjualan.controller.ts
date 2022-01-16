import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { PenjualanService } from './penjualan.service';
import { CreatePenjualanDto, FindPenjualanDto, PenjualanId } from './dto/create-penjualan.dto';
import { UpdatePenjualanDto } from './dto/update-penjualan.dto';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PenjualanProses } from './penjualan-proses.decorator';
import { JwtGuard } from 'src/auth/jwt.guard';
import { ResponProdukDto } from 'src/produk/dto/create-produk.dto';
import { CreatePenjualanItemDto } from './dto/penjualan-item.dto';
import { InjectUser } from 'src/etc/decorator/inject-user.decorator';
import { CreatePenjualanBayarDto } from './dto/penjualan-bayar.dto';

@ApiTags('Penjualan')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('penjualan')
export class PenjualanController {
  constructor(private readonly penjualanService: PenjualanService) { }

  @Post()
  @ApiBody({ type: CreatePenjualanDto })
  create(@PenjualanProses() createPenjualanDto: CreatePenjualanDto) { // biar otomatis kalkulasi // create(@Body() createPenjualanDto: CreatePenjualanDto) {
    return this.penjualanService.create(createPenjualanDto);
  }


  @Post('item')
  @ApiBody({ type: CreatePenjualanItemDto })
  createItem(@InjectUser()  createPenjualanItemDto: CreatePenjualanItemDto) {
    return this.penjualanService.createItem(createPenjualanItemDto);
  }

  @Post('bayar')
  @ApiBody({ type: CreatePenjualanBayarDto })
  createBayar(@InjectUser() createPenjualanBayarDto: CreatePenjualanBayarDto) { // biar otomatis kalkulasi // create(@Body() createPenjualanDto: CreatePenjualanDto) {
    return this.penjualanService.createBayar(createPenjualanBayarDto);
  }

  @Get()
  @ApiOkResponse({ type: ResponProdukDto }) //pagenation
  findAll(@Query() filter: FindPenjualanDto) { //pagenation
    return this.penjualanService.findAll(filter);

    // findAll() {
    //   return this.penjualanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.penjualanService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdatePenjualanDto })
  update(@Param('id') id: string, @PenjualanProses() updatePenjualanDto: UpdatePenjualanDto) { //  update(@Param('id') id: string, @Body() updatePenjualanDto: UpdatePenjualanDto) {
    return this.penjualanService.update(+id, updatePenjualanDto);
  }

  @Delete(':id')
  remove(@Param() id: PenjualanId) { //  remove(@Param('id') id: string) {
    return this.penjualanService.remove(id.id);
  }
}
