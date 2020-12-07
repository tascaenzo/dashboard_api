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
      //os: schema.os,
      token: schema.token,
      refreshToken: schema.refreshToken,
      refreshNumber: schema.refreshNumber,
      createAt: schema.createAt,
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
      //os: dto.os,
      token: dto.token,
      refreshToken: dto.refreshToken,
      refreshNumber: dto.refreshNumber,
      createAt: dto.createAt,
      refreshedAt: dto.refreshedAt,
      expiredTokenAt: dto.expiredTokenAt,
      expiredSessionAt: dto.expiredSessionAt,
    };
  }
}
