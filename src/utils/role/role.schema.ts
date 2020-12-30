import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { RoleCollectionDocument } from './collection/role.collection.schema';

export const COLLECTION_NAME = 'Role';
export const NAME_PLURAL = 'roles';

@Schema()
export class RoleDocument extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ default: false })
  isAdmin: boolean;

  @Prop({ default: false })
  isDevelop: boolean;

  @Prop({ default: [] })
  collections: RoleCollectionDocument[];

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const RoleSchema = SchemaFactory.createForClass(RoleDocument);
