import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

@Schema()
export class SessionDocument extends Document {
  @Prop({
    type: Types.ObjectId,
    required: true,
  })
  userId: Types.ObjectId;

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
