import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { AService } from '@/utils/crud/AService';
import { UserConverter } from '@/Converters/user.converter';
import { UserCreateDto, UserDto } from '@/Dto/user.dto';
import { UserDocument } from '@/Schemas/user.schema';

@Injectable()
export class UserService extends AService<UserDocument, UserDto> {
  constructor(
    @InjectModel('User')
    protected readonly repository: Model<UserDocument>,
    protected readonly converter: UserConverter,
  ) {
    super(repository, converter);
  }

  async createUser(dto: UserCreateDto): Promise<UserDto> {
    if (dto.password === undefined || dto.password === null) {
      throw new Error('Validation password fail');
    }
    dto.password = await bcrypt.hash(dto.password, 10);
    return this.converter.toDto(
      await new this.repository(this.converter.toSchemaCreate(dto)).save(),
    );
  }

  async findByEmailPasswor(loginDto: {
    email: string;
    password: string;
  }): Promise<UserDto> {
    try {
      const user: UserDocument = await this.repository.findOne({
        email: loginDto.email,
      });

      if (
        user !== null &&
        bcrypt.compareSync(loginDto.password, user.password)
      ) {
        return this.converter.toDto(user);
      }
      return null;
    } catch (e) {
      return null;
    }
  }
}
