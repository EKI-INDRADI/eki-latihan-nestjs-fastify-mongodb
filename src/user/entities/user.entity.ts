import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type UserDocument = User & Document;// Mirip DTO, tapi masih lebih keren DTO

@Schema()
export class User {

    // kok bikin id lagi ? 
    // karena tutorial ini adalah 
    // lanjutan dari https://github.com/EKI-INDRADI
    // agar memudahkan migrasi dari TypeORM yang menggunakan id

    //======================== AUTO GENERATE

    @Prop({
        type: Number,
        default: () =>  // di buat arrow function agar ketika generate data selalu mengecek function kembali (generate date.now())
            Number(
                new Date().getFullYear()
                + ("0" + (new Date().getMonth() + 1)).slice(-2)
                + ("0" + new Date().getDate()).slice(-2)
                + ("0" + new Date().getMinutes()).slice(-2)
                + ("0" + new Date().getSeconds()).slice(-2)
                + ("0" + new Date().getMilliseconds()).slice(-3)
            )
    })
    id: Number

    //======================== /AUTO GENERATE

    // =================== MONGOOSE PROGRESSIVE FRAMEWORK
    // @Prop({
    //     type: Number,
    //     default: () =>  
    //         Number(Date.now()) // karena berupa arrow function maka Date.now() dibaca kembali ketika ada data masuk
    // })
    // id1: Number

    // @Prop({
    //     type: Number,
    //     default:Number(Date.now()) //  Date.now() dibaca ketika backend running di awal
    // })
    // id2: Number
    // =================== /MONGOOSE PROGRESSIVE FRAMEWORK


    //======================== EXAMAPLE AUTO GENERATE
    // @Prop({
    //     type: String,
    //     default:  () => 'USR' + "/"
    //         + new Date().getFullYear()
    //         + ("0" + (new Date().getMonth() + 1)).slice(-2)
    //         + ("0" + new Date().getDate()).slice(-2) + "/"
    //         + Date.now()
    // })
    // id2: string

    // @Prop({
    //     type: String,
    //     default:  () => 'USR/'
    //         + new Date().getFullYear()
    //         + ("0" + (new Date().getMonth() + 1)).slice(-2)
    //         + ("0" + new Date().getDate()).slice(-2) + "-"
    //         + ("0" + new Date().getHours()).slice(-2) + ":"
    //         + ("0" + new Date().getMinutes()).slice(-2) + "-"
    //         + ("0" + new Date().getMilliseconds())
    //         // + ("0" + new Date().getSeconds()).slice(-2)
    // })
    // id2: string

    // @Prop({ type: Number, default: () => Number(Date.now()) })
    // id2: number

    // @Prop()
    // id3: {
    //     type: String,
    //     default: 'EKITESTING'
    // }

    //======================== /EXAMAPLE AUTO GENERATE

    @Prop()
    nama_user: string

    @Prop()
    email: string

    @Prop()
    username: string

    @Prop()
    password: string

    @Prop({ type: Date, default: () => Date.now() })
    create_at: Date

    @Prop({ type: Date, default: () => Date.now() })
    update_at?: Date

    // @Prop()
    // produk: Object

    // @Prop()
    // konsumen: Object

    // @Prop()
    // rekening: Object

}

export const UserSchema = SchemaFactory.createForClass(User);



// import { Konsumen } from "src/konsumen/entities/Konsumen.entity";
// import { Produk } from "src/produk/entities/produk.entity";
// import { Rekening } from "src/rekening/entities/rekening.entity";
// import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

// @Entity()

// export class User {
//     @PrimaryGeneratedColumn() //  otomatis generate sebagai primary key + auto increment
//     id: number

//     @Column()
//     nama_user: string

//     // @Column({ unique: true })
//     // pada class validator ada untuk melakukan validasi data yang sama (duplicate entry) berdasarkan class / array data , 
//     // jika terdapat value yang sama maka akan error 500 pada request,
//     // {
//     //     "statusCode": 500,
//     //     "message": "Internal server error"
//     // }
//     // maka pastikan sebelum unique : true pastikan telah menghapus data value kembar pada database
//     // karena error tidak detail , maka diperluan validasi function manual
//     @Column()
//     email: string

//     @Column()
//     username: string

//     @Column({ name: 'password', select: false }) // {select : false} atau { name: 'password', select: false } sama saja
//     password: string

//     @CreateDateColumn() // auto generate create new Date()
//     create_at: Date

//     @UpdateDateColumn() // auto generate update new Date()
//     update_at: Date

//     // relasi kepada produk
//     // ERD : user - produk
//     // ERD : 1 - *
//     // agar user dapat melakukan relasi pada produk 
//     @OneToMany(() => Produk, data => data.id)
//     produk: Produk

//     @OneToMany(() => Konsumen, data => data.id) // (yang di generate adalah Konsumen) tetapi classnya Konsumen, entities\Konsumen.entity.ts  
//     konsumen: Konsumen  //ini adalah kesalahan dari nest, kemungkinan karena auto checking english translate men jadi man

//     @OneToMany(() => Rekening, data => data.id) 
//     rekening: Rekening  

// }
