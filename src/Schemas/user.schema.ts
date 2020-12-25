import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class UserDocument extends Document {
  @Prop({ unique: true })
  email: string;

  @Prop()
  name: string;

  @Prop()
  surname: string;

  @Prop()
  password: string;

  @Prop({ default: false })
  isBanned: boolean;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
