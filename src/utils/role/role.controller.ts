import { Controller } from '@nestjs/common';
import { AController } from '@/utils/crud/AController';
import { RoleDto } from './role.dto';
import { RoleService } from './role.service';

@Controller('roles')
//@UseGuards(JwtAuthGuard)
export class RoleController extends AController<RoleDto> {
  constructor(protected readonly service: RoleService) {
    super(service);
  }
}
