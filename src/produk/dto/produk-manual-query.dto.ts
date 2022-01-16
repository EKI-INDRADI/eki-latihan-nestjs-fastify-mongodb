import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsObject, IsOptional, IsString, Max } from "class-validator"

export class ProdukManualQueryDto {

    @ApiProperty({ description: 'optional - bisa pake page (recomended) atau bisa menggunakan skip (auto handle)', required: false, default: '1 (number) , jangan gunakan page ketika menggunakan skip' })
    @IsNumber()
    @IsOptional()
    page: number //  page: number = 1 (jangan default dari sini mending dari ApiProperty)


    @ApiProperty({ description: 'optional - jangan gunakan ketika menggunakan page', required: false, default: '0 (number) , jangan gunakan skip ketika menggunakan page' })
    @IsNumber()
    @IsOptional()
    skip: number

    @ApiProperty({ required: false, default: 10 })
    @IsNumber()
    @Max(100)
    limit: number  //limit: number = 10 (jangan default dari sini mending dari ApiProperty)

    @ApiProperty({
        description: 'optional - contoh desc = -1 , asc = 1',
        default: { create_at: -1 }
    })
    @IsObject()
    @IsOptional()
    sort: object

    @ApiProperty({
        description: 'optional - contoh 0 = hilangkan object, 1 = munculkan object',
        default: { _id: 0, password: 0, 'user._id': 0, __v: 0 }
    })
    @IsObject()
    @IsOptional()
    projection: object

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