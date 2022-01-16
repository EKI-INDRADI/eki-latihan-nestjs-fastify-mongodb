import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Produk } from "src/produk/entities/produk.entity";
import { User } from "src/user/entities/user.entity";
// import { Penjualan } from "./penjualan.entity";
export type PenjualanItemDocument = PenjualanItem & Document;

@Schema()
export class PenjualanItem {
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
    jumlah_jual: number

    @Prop()
    harga_jual: number

    @Prop()
    potongan: number

    // @ManyToOne(() => Penjualan, data => data.id, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    // penjualan: Penjualan

    @Prop()
    produk: Produk

    @Prop({ type: Date, default: () => Date.now() })
    create_at: Date

    @Prop({ type: Date, default: () => Date.now() })
    update_at?: Date

    @Prop()
    user: User

}

export const PenjualanItemSchema = SchemaFactory.createForClass(PenjualanItem);
