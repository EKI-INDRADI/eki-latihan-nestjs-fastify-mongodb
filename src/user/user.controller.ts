import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto,  RequestGetUserCustomDto_WithPage, ResponGetUserCustomDto_WithPage, UserIdDto, UserManualQueryDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt.guard';

@ApiTags('User')
@Controller('user')

export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }


  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param() get_UserIdDto: UserIdDto) {
    return this.userService.remove(get_UserIdDto.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('manual-query')
  async manualQuery(@Body() req_body: UserManualQueryDto) {  //test
    // {
    //   "variant": "findOne",
    //   "condition": { "username" : "stringst"}
    // }
    let res_json = {}
    res_json = await this.userService.manualQuery(req_body.variant, req_body.condition)
    return res_json
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('manual-get-custom')
  @ApiOkResponse({ type: ResponGetUserCustomDto_WithPage })
  findAll2(@Body() req_body: RequestGetUserCustomDto_WithPage) {
    return this.userService.findAll2(req_body);
  }

}
