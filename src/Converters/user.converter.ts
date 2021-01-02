import { UserDocument } from '@/Schemas/user.schema';
import { UserCreateDto, UserDto } from '@/Dto/user.dto';

import { AConverter } from '@/utils/crud/AConverter';
import { Injectable } from '@nestjs/common';
import { RoleService } from '@/utils/role/role.service';
import { RoleDto } from '@/utils/role/role.dto';
import { Types } from 'mongoose';

@Injectable()
export class UserConverter extends AConverter<UserDocument, UserDto> {
  constructor(private readonly roleService: RoleService) {
    super();
  }
  async toDto(schema: UserDocument): Promise<UserDto> {
    let role: RoleDto = null;
    if (schema === null) return null;
    if (schema.roleId !== null) {
      role = await this.roleService.findOne(schema.roleId.toString());
    }
    const id = schema._id.toString();
    return new UserDto({
      id,
      email: schema.email,
      name: schema.name,
      surname: schema.surname,
      isBanned: schema.isBanned,
      role,
    });
  }

  async toSchema(dto: UserDto): Promise<UserDocument> {
    if (dto === null) return null;

    return <UserDocument>{
      _id: dto.id,
      email: dto.email,
      name: dto.name,
      surname: dto.surname,
      isBanned: dto.isBanned,
      roleId: new Types.ObjectId(dto.role.id),
    };
  }

  toSchemaCreate(dto: UserCreateDto): UserDocument {
    if (dto === null) return null;
    return <UserDocument>{
      email: dto.email,
      name: dto.name,
      surname: dto.surname,
      password: dto.password,
      isBanned: false,
    };
  }
}
