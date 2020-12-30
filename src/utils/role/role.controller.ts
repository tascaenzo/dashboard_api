import { Controller } from '@nestjs/common';
import { AController } from '@/utils/crud/AController';
import { RoleDto } from './role.dto';
import { RoleService } from './role.service';
import { NAME_PLURAL } from './role.schema';

@Controller(NAME_PLURAL)
//@UseGuards(JwtAuthGuard)
export class RoleController extends AController<RoleDto> {
  constructor(protected readonly service: RoleService) {
    super(service);
  }
}
