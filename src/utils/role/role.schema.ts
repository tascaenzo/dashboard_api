import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { RoleCollectionDocument } from './collection/role.collection.schema';

@Schema()
export class RoleDocument extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ default: false })
  isRoot: boolean;

  @Prop({ default: false })
  isDevelop: boolean;

  @Prop({ default: [] })
  collections: RoleCollectionDocument[];

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const RoleSchema = SchemaFactory.createForClass(RoleDocument);
