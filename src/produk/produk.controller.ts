import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, Query, Req, Res } from '@nestjs/common';
import { ProdukService } from './produk.service';
import { CreateProdukDto, FindProdukDto, ProdukIdDto, ResponProdukDto } from './dto/create-produk.dto';
import { UpdateProdukDto } from './dto/update-produk.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt.guard';
// =========================== DISABLE FASTIFY ADAPTER
// import { FileInterceptor } from  '@nestjs/platform-express'; //DISABLE FASTIFY ADAPTER
// import { diskStorage } from 'multer';
// import { extname } from 'path';
// =========================== /DISABLE FASTIFY ADAPTER
import { InjectUser } from 'src/etc/decorator/inject-user.decorator';
import { ProdukManualQueryDto } from './dto/produk-manual-query.dto';

@ApiTags('Produk')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('produk')
export class ProdukController {
  constructor(private readonly produkService: ProdukService) { }

  @Post() 
  @ApiBody({ type: CreateProdukDto }) 
  create(@InjectUser() createProdukDto: CreateProdukDto) { 
    return this.produkService.create(createProdukDto);
  }

  @Get()
  @ApiOkResponse({ type: ResponProdukDto })
  findAll(@Query() page: FindProdukDto) {
    return this.produkService.findAll(page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produkService.findOne(+id);
  }

  @Patch(':id')
  
  @ApiBody({ type: UpdateProdukDto }) 
  update(@Param('id') id: string, @InjectUser() updateProdukDto: UpdateProdukDto) {
    return this.produkService.update(+id, updateProdukDto);
  }

  @Delete(':id')
  remove(@Param() id: ProdukIdDto) {
    return this.produkService.remove(id.id);
  }


  @Post('/produk-manual-query')
  async manualQuery(@Body() req_body: ProdukManualQueryDto) {
    return this.produkService.GetProduk(req_body)
  }


}
