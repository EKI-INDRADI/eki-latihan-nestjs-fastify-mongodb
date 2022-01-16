import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Rekening } from "src/rekening/entities/rekening.entity";
// import { Rekening } from "src/rekening/entities/rekening.entity";
import { User } from "src/user/entities/user.entity";
import { Penjualan } from "./penjualan.entity";
export type PenjualanBayarDocument = PenjualanBayar & Document;

@Schema()
export class PenjualanBayar {
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
    id: number

    @Prop()
    tanggal_bayar : Date

    @Prop()
    jumlah_bayar : number

    // @Prop()
    // penjualan: Penjualan 

    @Prop()
    rekening: Rekening 

    @Prop({ type: Date, default: () => Date.now() })
    create_at: Date

    @Prop({ type: Date, default: () => Date.now() })
    update_at?: Date

    @Prop()
    user: User

}

export const PenjualanBayarSchema = SchemaFactory.createForClass(PenjualanBayar);