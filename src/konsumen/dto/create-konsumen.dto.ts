import { ApiHideProperty, ApiProperty, OmitType, PickType } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsObject, IsOptional, IsString, Max, MaxLength, Min, MinLength } from "class-validator"
import { PageRequestDto, PageResponseDto } from "src/etc/dto/page-dto"
import { IsExist } from "src/etc/validator/exist-validator"
import { IsUnique } from "src/etc/validator/unique-validator"
import { UserDto, UserDtoRelation } from "src/user/dto/create-user.dto"
import { Konsumen } from "../entities/konsumen"

export class KonsumenDto {
    @ApiProperty() //swagger
    @IsExist([Konsumen, 'id'])
    id: number

    @ApiProperty({ default: 'ekitesting' })
    @IsString()
    @IsNotEmpty()
    @IsUnique([Konsumen, 'nama_konsumen'])
    nama_konsumen: string

    @ApiProperty({ default: 'jl. ekitesting' })
    @IsString()
    @IsNotEmpty()
    alamat_konsumen: string

    @ApiProperty({ default: 'ekitesting@mail.com' })
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @IsUnique([Konsumen, 'email_konsumen'])
    email_konsumen: string

    @ApiProperty({ default: '+628000000001' })
    @IsString()
    @IsNotEmpty()
    @IsUnique([Konsumen, 'no_hp_konsumen'])
    @MinLength(10)
    @MaxLength(13)
    no_hp_konsumen: string

    @ApiHideProperty() 
    @IsObject()  
    user: UserDtoRelation //    user: UserDto 
}
export class CreateKonsumenDto extends OmitType(KonsumenDto, ['id']) { } // buang id
export class KonsumenId extends PickType(KonsumenDto, ['id']) { } // hanya ambil id

export class FindKonsumenDto extends PageRequestDto{
    @ApiProperty({required: false})
    @IsString()
    @IsOptional()
    nama_konsumen: string

    @ApiProperty({required: false})
    @IsString()
    @IsOptional()
    alamat_konsumen: string

    @ApiProperty({required: false})
    @IsString()
    @IsEmail()
    @IsOptional()
    email_konsumen: string

    @ApiProperty({required: false})
    @IsString()
    @IsOptional()
    no_hp_konsumen: string
}

export class ResponseKonsumenDto extends PageResponseDto{
    @ApiProperty({type : [KonsumenDto]})
    data : KonsumenDto[]
}

export class KonsumenDtoRelation {
    @ApiProperty()
    @IsExist([Konsumen, 'id'])
    id: number

    @ApiProperty({ default: 'ekitesting' })
    @IsString()
    @IsNotEmpty()
    @IsExist([Konsumen, 'nama_konsumen'])
    nama_konsumen: string

    @ApiProperty({ default: 'jl. ekitesting' })
    @IsString()
    @IsNotEmpty()
    alamat_konsumen: string

    @ApiProperty({ default: 'ekitesting@mail.com' })
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @IsExist([Konsumen, 'email_konsumen'])
    email_konsumen: string

    @ApiProperty({ default: '+628000000001' })
    @IsString()
    @IsNotEmpty()
    @IsExist([Konsumen, 'no_hp_konsumen'])
    @MinLength(10)
    @MaxLength(13)
    no_hp_konsumen: string

    @ApiProperty()
    @IsObject()  
    user: UserDtoRelation 
}