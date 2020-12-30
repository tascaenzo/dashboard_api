import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export const COLLECTION_NAME = 'User';
export const NAME_PLURAL = 'users';

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

  @Prop({ default: null })
  roleId: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
