import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/*
 * CRUD authorization, Default all collections is only reads
 */

@Schema()
export class RoleCollectionDocument extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ default: false })
  isPublic: boolean;

  @Prop({ default: false })
  canCreate: boolean;

  @Prop({ default: true })
  canRead: boolean;

  @Prop({ default: false })
  canUpdate: boolean;

  @Prop({ default: false })
  canDelete: boolean;

  public constructor(document?: Partial<RoleCollectionDocument>) {
    super();
    Object.assign(this, document);
  }
}

export const RoleCollectionSchema = SchemaFactory.createForClass(
  RoleCollectionDocument,
);
