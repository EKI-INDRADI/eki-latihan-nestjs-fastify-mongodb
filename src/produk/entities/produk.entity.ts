import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
export type ProdukDocument = Produk & Document;

@Schema()
export class Produk {
    @Prop({
        type: Number,
        default: () =>  
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

    @Prop()
    barcode: string

    @Prop()
    nama_produk: string

    @Prop()
    deskripsi_produk: string

    @Prop()
    harga_beli: number

    @Prop()
    harga_jual: number

    @Prop()
    foto: string

    @Prop({ type: Date, default: () => Date.now() })
    create_at: Date

    @Prop({ type: Date, default: () => Date.now() })
    update_at?: Date

    @Prop()
    user: User

}

export const ProdukSchema = SchemaFactory.createForClass(Produk);
