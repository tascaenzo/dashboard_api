import { UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AController } from '@/utils/crud/AController';
import { UserDto } from '@/Dto/user.dto';
import { UserService } from '@/Services/user.service';
import { JwtAuthGuard } from '@/utils/auth/guards/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController extends AController<UserDto> {
  constructor(protected readonly service: UserService) {
    super(service);
  }
}
