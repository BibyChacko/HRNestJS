import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { HydratedDocument, ObjectId } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User{

    @Prop()
    id?: ObjectId;
    
    @Prop({ required: true})
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true, select: false})
    password: string

    @Prop()
    role: string

}

export const UserSchema = SchemaFactory.createForClass(User);