import { AConverter } from '@/utils/crud/AConverter';
import { Injectable } from '@nestjs/common';
import { MediaDto } from './media.dto';
import { MediaDocument } from './media.schema';

@Injectable()
export class MediaConverter extends AConverter<MediaDocument, MediaDto> {
  constructor() {
    super();
  }

  async toDto(schema: MediaDocument): Promise<MediaDto> {
    if (schema === null) return null;
    const id = schema._id.toString();
    return new MediaDto({
      id,
    });
  }

  async toSchema(dto: MediaDto): Promise<MediaDocument> {
    if (dto === null) return null;
    return <MediaDocument>{
      //_id: dto.id === undefined ? null : dto.id,
      name: dto.name,
    };
  }
}
