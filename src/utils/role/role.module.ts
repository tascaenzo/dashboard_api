import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule, Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleConverter } from './role.converter';
import { COLLECTION_NAME, RoleSchema } from './role.schema';
import { RoleService } from './role.service';
import { RoleCollectionConverter } from './collection/role.collection.converter';
import * as redisStore from 'cache-manager-redis-store';

import { CACHE_CONFIG } from '@/utils/env.json';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: COLLECTION_NAME, schema: RoleSchema }]),
    CacheModule.register({
      store: redisStore,
      host: CACHE_CONFIG.HOST,
      port: CACHE_CONFIG.PORT,
      ttl: CACHE_CONFIG.TTL, //12h
    }),
  ],
  controllers: [RoleController],
  providers: [RoleConverter, RoleService, RoleCollectionConverter],
  exports: [RoleService],
})
export class RoleModule {}
