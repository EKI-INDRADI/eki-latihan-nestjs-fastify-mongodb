import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/user/entities/user.entity";
import { PenjualanBayar } from "./penjualan-bayar.entity";
import { PenjualanItem } from "./penjualan-item.entity";
// import { PenjualanBayar } from "./penjualan-bayar.entity";
// import { PenjualanItem } from "./penjualan-item.entity";
// import { Konsumen } from "src/konsumen/entities/Konsumen.entity";
export type PenjualanDocument = Penjualan & Document;

@Schema()
export class Penjualan {
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
    no_faktur: string

    @Prop()
    tanggal: Date

    @Prop()
    total_transaksi: number

    @Prop()
    total_potongan: number

    @Prop()
    total_bayar: number

    // @ManyToOne(() => Konsumen, data => data.id)
    // konsumen: Konsumen

    @Prop()
    item: PenjualanItem[]

    @Prop()
    bayar: PenjualanBayar[] 

    @Prop({ type: Date, default: () => Date.now() })
    create_at: Date

    // @Prop({
    //     type: Date, default: (data: any) => {
    //         if (data.id) {
    //             Date.now()
    //         }
    //     }
    // })
    @Prop({ type: Date, default: () => Date.now() })
    update_at?: Date

    @Prop()
    user: User

}


export const PenjualanSchema = SchemaFactory.createForClass(Penjualan);
