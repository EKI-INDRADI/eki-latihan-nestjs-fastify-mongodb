import { ApiHideProperty, ApiProperty, OmitType } from "@nestjs/swagger"
import { IsNumber, IsObject, IsOptional, Min, ValidateNested } from "class-validator"
import { ProdukDto, ProdukDtoRelation, ProdukIdDto } from "src/produk/dto/create-produk.dto"
import { CreateUserDto, UserDto, UserDtoRelation, UserIdDto } from "src/user/dto/create-user.dto"

export class PenjualanItemDto {
    @ApiHideProperty()
    @IsOptional()
    id: number
    
    @ApiProperty()
    @Min(1)
    @IsNumber()
    jumlah_jual: number
    
    @ApiProperty()
    @IsNumber()
    harga_jual: number
    
    @ApiProperty()
    @IsNumber()
    potongan: number
    
    @ApiProperty({type:ProdukDtoRelation})
    @IsObject()
    @ValidateNested()
    produk: ProdukDtoRelation
    
    // @ApiHideProperty()
    // @IsObject()
    // user: UserDto

    // @ApiProperty({type:UserDtoRelation}) // gak perlu manual input sudah di inject @InjectUser()
    @ApiHideProperty()
    @IsObject()
    // @ValidateNested() // ga perlu validasi schema (data pasti benar)
    user: UserDtoRelation
}


export class CreatePenjualanItemDto extends OmitType(PenjualanItemDto, ['id']) { }


export class PenjualanItemDtoRelation {
    @ApiHideProperty()
    @IsOptional()
    id: number
    
    @ApiProperty()
    @Min(1)
    @IsNumber()
    jumlah_jual: number
    
    @ApiProperty()
    @IsNumber()
    harga_jual: number
    
    @ApiProperty()
    @IsNumber()
    potongan: number
    
    @ApiProperty({type:ProdukDtoRelation})
    @IsObject()
    @ValidateNested()
    produk: ProdukDtoRelation

    @ApiProperty({type:UserDtoRelation}) 
    @IsObject()
    user: UserDtoRelation
}
