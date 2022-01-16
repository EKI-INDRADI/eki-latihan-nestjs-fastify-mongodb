import { ApiHideProperty, ApiProperty, OmitType } from "@nestjs/swagger"
import { IsDate, IsNumber, IsObject, IsOptional, ValidateNested } from "class-validator"
import { RekeningDtoRelation } from "src/rekening/dto/create-rekening.dto"
import { UserDto, UserDtoRelation } from "src/user/dto/create-user.dto"
import { Penjualan } from "../entities/penjualan.entity"


export class PenjualanBayarDto {
    @ApiHideProperty()
    @IsOptional()
    id?: number

    @ApiProperty()
    @IsDate()
    tanggal_bayar: Date

    @ApiProperty()
    @IsNumber()
    jumlah_bayar: number

    // @ApiProperty({ type: Penjualan })
    // @IsObject()
    // @ValidateNested()
    // penjualan: Penjualan

    @ApiProperty({ type: RekeningDtoRelation })
    @IsObject()
    @ValidateNested()
    rekening: RekeningDtoRelation

    @ApiHideProperty()
    @IsObject()
    user: UserDtoRelation

}

export class CreatePenjualanBayarDto extends OmitType(PenjualanBayarDto, ['id']) { }

export class PenjualanBayarDtoRelation {
    @ApiHideProperty()
    @IsOptional()
    id?: number

    @ApiProperty()
    @IsDate()
    tanggal_bayar: Date

    @ApiProperty()
    @IsNumber()
    jumlah_bayar: number

    @ApiProperty({ type: RekeningDtoRelation })
    @IsObject()
    @ValidateNested()
    rekening: RekeningDtoRelation

    @ApiProperty({ type: UserDtoRelation })
    @IsObject()
    user: UserDtoRelation

}