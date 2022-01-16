

import { ApiHideProperty, ApiProperty, OmitType, PickType } from "@nestjs/swagger"
import { IsDate, IsObject, IsOptional, IsString, ValidateNested } from "class-validator"
import { PageRequestDto, PageResponseDto } from "src/etc/dto/page-dto"
import { IsExist } from "src/etc/validator/exist-validator"
import { CreateUserDto, UserDto, UserDtoRelation } from "src/user/dto/create-user.dto"
import { Rekening } from "../entities/rekening.entity"

export class RekeningDto {
    @ApiProperty()
    @IsExist([Rekening, 'id'])
    id: number

    @ApiProperty()
    @IsString()
    nama_rekening: string

    @ApiProperty()
    @IsString()
    keterangan_rekening: string

    @ApiProperty()
    @IsString()
    type_rekening: string

    @ApiHideProperty() 
    @IsObject()  
    user: UserDtoRelation //    user: UserDto 
}

// export class CreateRekeningDto { }
export class CreateRekeningDto extends OmitType(RekeningDto, ['id']) { } // buang id
export class RekeningIdDto extends PickType(RekeningDto, ['id']) { } // ambil id doang

export class FindRekening extends PageRequestDto{
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    nama_rekening: string
}

export class ResponRekeningDto extends PageResponseDto {
    @ApiProperty({type : [RekeningDto]})
    data : RekeningDto[]

}



export class RekeningDtoRelation {
    @ApiProperty()
    @IsExist([Rekening, 'id'])
    id: number

    @ApiProperty()
    @IsString()
    nama_rekening: string

    @ApiProperty()
    @IsString()
    keterangan_rekening: string

    @ApiProperty()
    @IsString()
    type_rekening: string

    @ApiProperty()
    @IsOptional()   
    @IsObject()
    @ValidateNested()
    user: UserDtoRelation 

    @ApiProperty()
    @IsDate()
    create_at : Date

    @ApiProperty()
    @IsDate()
    update_at : Date
}