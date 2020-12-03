import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserDocument } from '@/Schemas/user.schema';

@Schema()
export class SessionDocument extends Document {
  @Prop({
    type: UserDocument,
    //ref: UserSchema,
    required: true,
  })
  user: UserDocument;

  @Prop()
  ip: string;

  @Prop()
  browser: string;

  @Prop()
  os: string;

  @Prop()
  token: string;

  @Prop()
  refreshToken: string;

  @Prop({ default: 0 })
  refreshNumber: number;

  @Prop({ default: new Date() })
  createAt: Date;

  @Prop({ default: null })
  refreshedAt: Date;

  @Prop({ default: null })
  expiredAt: Date;
}

export const SessionSchema = SchemaFactory.createForClass(SessionDocument);
