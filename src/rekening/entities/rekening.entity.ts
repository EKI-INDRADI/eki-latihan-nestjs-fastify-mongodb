
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/user/entities/user.entity";

export type RekeningDocument = Rekening & Document;

@Schema()
export class Rekening {
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
    nama_rekening: string

    @Prop()
    keterangan_rekening: string

    @Prop()
    type_rekening: string

    @Prop({ type: Date, default: () => Date.now() })
    create_at: Date

    @Prop({ type: Date, default: () => Date.now() })
    update_at?: Date

    @Prop()
    user: User
}
export const RekeningSchema = SchemaFactory.createForClass(Rekening);

