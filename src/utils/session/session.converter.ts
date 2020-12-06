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
      expiredAt: schema.expiredAt,
    });
  }

  toSchema(dto: SessionDto): SessionDocument {
    if (dto === null) return null;
    return <SessionDocument>{
      //id: schema._id,
      user: dto.user,
      ip: dto.ip,
      userAgent: dto.userAgent,
      //os: dto.os,
      token: dto.token,
      refreshToken: dto.refreshToken,
      refreshNumber: dto.refreshNumber,
      createAt: dto.createAt,
      refreshedAt: dto.refreshedAt,
      expiredAt: dto.expiredAt,
    };
  }
}
