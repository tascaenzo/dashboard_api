import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AService } from '@/utils/crud/AService';
import { RoleConverter } from './role.converter';
import { RoleDto } from './role.dto';
import { COLLECTION_NAME, RoleDocument } from './role.schema';

@Injectable()
export class RoleService extends AService<RoleDocument, RoleDto> {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager,
    @InjectModel(COLLECTION_NAME)
    protected readonly repository: Model<RoleDocument>,
    protected readonly converter: RoleConverter,
  ) {
    super(repository, converter);
  }

  /* Override to save or return cache */
  async findOne(id: string): Promise<RoleDto> {
    let roleCache: RoleDto = await this.cacheManager.get(id.toString());
    if (roleCache !== null) {
      return roleCache;
    }

    roleCache = await super.findOne(id);

    if (roleCache !== null) {
      await this.cacheManager.set(id.toString(), roleCache);
    }
    return roleCache;
  }

  /* Override to remove cache */
  async remove(
    id: string,
  ): Promise<{ ok?: number; n?: number } & { deletedCount?: number }> {
    const role = await super.findOne(id);
    if (role !== null) {
      if (this.cacheManager.get(id.toString()) !== null) {
        this.cacheManager.del(id.toString());
      }
    }
    return await super.remove(id);
  }

  /* Override to remove cache */
  async update(id: string, dto: RoleDto) {
    const role = await super.findOne(id);

    if (role !== null) {
      const cacheById = await this.cacheManager.get(role.id.toString());
      if (cacheById !== null) {
        this.cacheManager.del(role.id.toString());
      }
    }
    this.cacheManager.del(id.toString());
    return await super.update(id, dto);
  }
}
