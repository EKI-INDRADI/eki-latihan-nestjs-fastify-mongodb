import { ApiHideProperty, ApiProperty, OmitType, PickType } from "@nestjs/swagger"
import { IsDate, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator"
import { PageRequestDto, PageResponseDto } from "src/etc/dto/page-dto"
import { IsExist } from "src/etc/validator/exist-validator"
import { IsUnique } from "src/etc/validator/unique-validator"
import { UserDto, UserDtoRelation } from "src/user/dto/create-user.dto"
import { Produk } from "../entities/produk.entity"

export class ProdukDto {
    @ApiProperty() //swagger
    @IsExist([Produk, 'id'])
    @IsNumber()
    id: number

    @ApiProperty()
    @IsUnique([Produk, 'barcode'])
    @IsString()
    @IsNotEmpty()
    barcode: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nama_produk: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    deskripsi_produk: string

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    harga_beli: number

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    harga_jual: number

    @ApiProperty({ format: 'binary' })  
    @IsOptional() 
    foto: string

    @ApiHideProperty() 
    @IsObject()  
    user: UserDtoRelation //    user: UserDto 
}
export class CreateProdukDto extends OmitType(ProdukDto, ['id']) { } 
export class ProdukIdDto extends PickType(ProdukDto, ['id']) { } 

export class FindProdukDto extends PageRequestDto { 
    @ApiProperty({ required: false, default: 'data' })
    @IsOptional()
    @IsString()
    barcode: string

    @ApiProperty({ required: false, default: '' })
    @IsOptional()
    @IsString()
    nama_produk: string

    @ApiProperty({ required: false, default: '' })
    @IsOptional()
    @IsString()
    deskripsi_produk: string

    @ApiProperty({ required: false, default: 1000 })
    @IsOptional()
    @IsNumber()
    harga_beli: number

    @ApiProperty({ required: false, default: 1500 })
    @IsOptional()
    @IsNumber()
    harga_jual: number
}

export class ResponProdukDto extends PageResponseDto {
    @ApiProperty({type : [ProdukDto]})
    data : ProdukDto[]

}

export class ProdukDtoRelation {
    @ApiProperty() //swagger
    @IsExist([Produk, 'id'])
    @IsNumber()
    id?: number

    @ApiProperty()
    @IsExist([Produk, 'barcode'])
    // @IsUnique([Produk, 'barcode'])
    @IsString()
    @IsNotEmpty()
    barcode: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nama_produk: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    deskripsi_produk: string

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    harga_beli: number

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    harga_jual: number

    @ApiProperty({ format: 'binary' })  
    @IsOptional() 
    foto: string

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