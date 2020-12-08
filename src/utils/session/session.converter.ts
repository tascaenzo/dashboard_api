import { AConverter } from '@/utils/crud/AConverter';
import { Injectable } from '@nestjs/common';
import { SessionDto } from './session.dto';
import { SessionDocument } from './session.schema';

@Injectable()
export class SessionConverter extends AConverter<SessionDocument, SessionDto> {
  toDto(schema: SessionDocument): SessionDto {
    if (schema === null) return null;
    return new SessionDto({
      id: schema._id,
      user: schema.user,
      ip: schema.ip,
      userAgent: schema.userAgent,
      token: schema.token,
      refreshToken: schema.refreshToken,
      refreshNumber: schema.refreshNumber,
      createdAt: schema.createdAt,
      refreshedAt: schema.refreshedAt,
      expiredTokenAt: schema.expiredTokenAt,
      expiredSessionAt: schema.expiredSessionAt,
    });
  }

  toSchema(dto: SessionDto): SessionDocument {
    if (dto === null) return null;
    return <SessionDocument>{
      _id: dto.id,
      user: dto.user,
      ip: dto.ip,
      userAgent: dto.userAgent,
      token: dto.token,
      refreshToken: dto.refreshToken,
      refreshNumber: dto.refreshNumber,
      refreshedAt: dto.refreshedAt,
      expiredTokenAt: dto.expiredTokenAt,
      expiredSessionAt: dto.expiredSessionAt,
    };
  }
}
