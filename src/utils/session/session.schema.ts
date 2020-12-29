import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { RoleCollectionDocument } from '../role/collection/role.collection.schema';
//import { UserDocument } from '@/Schemas/user.schema';
import { UserDto } from '@/Dto/user.dto';

@Schema()
export class SessionDocument extends Document {
  @Prop({
    type: UserDto,
    required: true,
  })
  user: UserDto;

  @Prop()
  ip: string;

  @Prop()
  userAgent: string;

  @Prop()
  token: string;

  @Prop()
  refreshToken: string;

  @Prop({ default: 0 })
  refreshNumber: number;

  @Prop({ default: null })
  refreshedAt: Date;

  @Prop({ default: null })
  expiredTokenAt: string;

  @Prop({ type: Date })
  expiredSessionAt: Date;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  public constructor(document?: Partial<RoleCollectionDocument>) {
    super();
    Object.assign(this, document);
  }
}

export const SessionSchema = SchemaFactory.createForClass(SessionDocument);
