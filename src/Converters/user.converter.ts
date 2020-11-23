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
      mail: schema.mail,
      name: schema.name,
      surname: schema.surname,
      //password: schema.password,
    });
  }

  toSchema(dto: UserDto): UserDocument {
    return <UserDocument>{
      username: dto.username,
      mail: dto.mail,
      name: dto.name,
      surname: dto.surname,
      password: dto.password,
    };
  }
}
