import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { RoleCollectionDocument } from '../role/collection/role.collection.schema';

export const COLLECTION_NAME = 'media';
export const NAME_PLURAL = 'media';

@Schema()
export class MediaDocument extends Document {
  @Prop()
  name: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  public constructor(document?: Partial<RoleCollectionDocument>) {
    super();
    Object.assign(this, document);
  }
}

export const MediaSchema = SchemaFactory.createForClass(MediaDocument);
