import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AService } from '@/utils/crud/AService';
import { RoleConverter } from './role.converter';
import { RoleDto } from './role.dto';
import { RoleDocument } from './role.schema';

@Injectable()
export class RoleService extends AService<RoleDocument, RoleDto> {
  constructor(
    @InjectModel('Role')
    protected readonly repository: Model<RoleDocument>,
    protected readonly converter: RoleConverter,
  ) {
    super(repository, converter);
  }
}
