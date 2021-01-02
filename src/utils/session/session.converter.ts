import { UserConverter } from '@/Converters/user.converter';
import { AConverter } from '@/utils/crud/AConverter';
import { Injectable } from '@nestjs/common';
import { SessionDto } from './session.dto';
import { SessionDocument } from './session.schema';

@Injectable()
export class SessionConverter extends AConverter<SessionDocument, SessionDto> {
  constructor(private readonly userConverter: UserConverter) {
    super();
  }

  async toDto(schema: SessionDocument): Promise<SessionDto> {
    if (schema === null) return null;
    const id = schema._id.toString();
    return new SessionDto({
      id,
      user: await this.userConverter.toDto(schema.user),
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

  async toSchema(dto: SessionDto): Promise<SessionDocument> {
    if (dto === null) return null;
    return <SessionDocument>{
      //_id: dto.id === undefined ? null : dto.id,
      user: await this.userConverter.toSchema(dto.user),
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
