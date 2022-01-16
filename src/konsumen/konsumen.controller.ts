import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { KonsumenService } from './konsumen.service';
import { CreateKonsumenDto, FindKonsumenDto, KonsumenId, ResponseKonsumenDto } from './dto/create-Konsumen.dto';
import { UpdateKonsumenDto } from './dto/update-Konsumen.dto';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { InjectUser } from 'src/etc/decorator/inject-user.decorator';
import { JwtGuard } from 'src/auth/jwt.guard';

@ApiTags('Konsumen')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('konsumen')
export class KonsumenController {
  constructor(private readonly konsumenService: KonsumenService) { }

  @Post()
  @ApiBody({ type: CreateKonsumenDto })
  create(@InjectUser() createKonsumenDto: CreateKonsumenDto) {
    return this.konsumenService.create(createKonsumenDto);
  }

  @Get()
  @ApiOkResponse({ type: ResponseKonsumenDto })
  findAll(@Query() filter: FindKonsumenDto) {
    return this.konsumenService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.konsumenService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateKonsumenDto })
  update(@Param('id') id: number, @InjectUser() updateKonsumenDto: UpdateKonsumenDto) {
    return this.konsumenService.update(id, updateKonsumenDto);
  }

  @Delete(':id')
  remove(@Param() id: KonsumenId) {
    return this.konsumenService.remove(id.id);
  }
}
