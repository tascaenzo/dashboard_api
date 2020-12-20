import { RoleCollectionDocument } from '@/utils/role/collection/role.collection.schema';
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

  public constructor(document?: Partial<RoleCollectionDocument>) {
    super();
    Object.assign(this, document);
  }
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
