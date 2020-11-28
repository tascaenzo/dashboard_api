import { UserDocument } from '@/Schemas/user.schema';
import { UserDto } from '@/Dto/user.dto';

import { AConverter } from '@/utils/crud/AConverter';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserConverter extends AConverter<UserDocument, UserDto> {
  toDto(schema: UserDocument): UserDto {
    return new UserDto({
      id: schema._id,
      username: schema.username,
      email: schema.email,
      name: schema.name,
      surname: schema.surname,
      //password: schema.password,
    });
  }

  toSchema(dto: UserDto): UserDocument {
    return <UserDocument>{
      username: dto.username,
      email: dto.email,
      name: dto.name,
      surname: dto.surname,
      password: dto.password,
    };
  }
}
