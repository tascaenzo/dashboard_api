import { UserDocument } from '@/Schemas/user.schema';
import { UserDto } from '@/Dto/user.dto';

import { AConverter } from '@/utils/crud/AConverter';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserConverter extends AConverter<UserDocument, UserDto> {
  toDto(schema: UserDocument): UserDto {
    if (schema === null) return null;
    return new UserDto({
      id: schema._id,
      email: schema.email,
      name: schema.name,
      surname: schema.surname,
      //password: schema.password,
    });
  }

  toSchema(dto: UserDto): UserDocument {
    if (dto === null) return null;
    return <UserDocument>{
      email: dto.email,
      name: dto.name,
      surname: dto.surname,
      password: dto.password,
    };
  }
}
