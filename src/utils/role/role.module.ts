import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleConverter } from './role.converter';
import { RoleSchema } from './role.schema';
import { RoleService } from './role.service';
import { RoleCollectionConverter } from './collection/role.collection.converter';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Role', schema: RoleSchema }])],
  controllers: [RoleController],
  providers: [RoleConverter, RoleService, RoleCollectionConverter],
  exports: [RoleService],
})
export class RoleModule {}
