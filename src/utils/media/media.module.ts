import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule, Module } from '@nestjs/common';
import { COLLECTION_NAME, MediaSchema } from './media.schema';
import { MediaController } from './media.controller';
import { MediaConverter } from './media.converter';
import { MediaService } from './media.service';
import * as redisStore from 'cache-manager-redis-store';

import { CACHE_CONFIG } from '@/utils/env.json';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: COLLECTION_NAME, schema: MediaSchema }]),
    CacheModule.register({
      store: redisStore,
      host: CACHE_CONFIG.HOST,
      port: CACHE_CONFIG.PORT,
      ttl: CACHE_CONFIG.TTL, //12h
    }),
  ],
  controllers: [MediaController],
  providers: [MediaConverter, MediaService],
  exports: [MediaService],
})
export class MediaModule {}
