import { AConverter } from '@/utils/crud/AConverter';
import { Injectable } from '@nestjs/common';
import { SessionDto } from './session.dto';
import { SessionDocument } from './session.schema';

@Injectable()
export class SessionConverter extends AConverter<SessionDocument, SessionDto> {
  toDto(schema: SessionDocument): SessionDto {
    return new SessionDto({
      id: schema._id,
      userId: schema.userId,
      ip: schema.ip,
      browser: schema.browser,
      os: schema.os,
      token: schema.token,
      refreshToken: schema.refreshToken,
      refreshNumber: schema.refreshNumber,
      createAt: schema.createAt,
      refreshedAt: schema.refreshedAt,
      expiredAt: schema.expiredAt,
    });
  }

  toSchema(dto: SessionDto): SessionDocument {
    return <SessionDocument>{
      //id: schema._id,
      //userId: dto.userId,
      ip: dto.ip,
      browser: dto.browser,
      os: dto.os,
      token: dto.token,
      refreshToken: dto.refreshToken,
      refreshNumber: dto.refreshNumber,
      createAt: dto.createAt,
      refreshedAt: dto.refreshedAt,
      expiredAt: dto.expiredAt,
    };
  }
}
