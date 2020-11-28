import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AService } from '@/utils/crud/AService';
import { UserConverter } from '@/Converters/user.converter';
import { UserDto } from '@/Dto/user.dto';
import { UserDocument } from '@/Schemas/user.schema';
import { LoginDto } from '@/utils/auth/auth.dto';

@Injectable()
export class UserService extends AService<UserDocument, UserDto> {
  constructor(
    @InjectModel('User') protected readonly repository: Model<UserDocument>,
    protected readonly converter: UserConverter,
  ) {
    super(repository, converter);
  }

  async findByEmailPasswor(loginDto: LoginDto): Promise<UserDto> {
    try {
      return this.converter.toDto(await this.repository.findOne(loginDto));
    } catch (e) {
      return null;
    }
  }
}
