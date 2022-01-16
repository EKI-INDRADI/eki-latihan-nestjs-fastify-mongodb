import { ApiHideProperty, ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsObject, IsString, MaxLength, MinLength } from 'class-validator';
import { UserDto, UserDtoRelation } from 'src/user/dto/create-user.dto';
// import { KonsumenDto } from './create-konsumen.dto';

// export class UpdateKonsumenDto extends PartialType(KonsumenDto) {}
export class UpdateKonsumenDto {
    
    @ApiProperty({ default: 'ekitesting' })
    @IsString()
    @IsNotEmpty()
    // @IsUnique([Konsumen, 'nama_konsumen'])
    nama_konsumen: string

    @ApiProperty({ default: 'jl. ekitesting' })
    @IsString()
    @IsNotEmpty()
    alamat_konsumen: string

    @ApiProperty({ default: 'ekitesting@mail.com' })
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    // @IsUnique([Konsumen, 'email_konsumen'])
    email_konsumen: string

    @ApiProperty({ default: '+628000000001' })
    @IsString()
    @IsNotEmpty()
    // @IsUnique([Konsumen, 'no_hp_konsumen'])
    @MinLength(10)
    @MaxLength(13)
    no_hp_konsumen: string

    @ApiHideProperty() 
    @IsObject()  
    user: UserDtoRelation //    user: UserDto 
}