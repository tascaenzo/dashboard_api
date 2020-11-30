import { UserDto } from '@/Dto/user.dto';

export class LoginDto {
  email: string;
  password: string;
}

export class jwtAuth {
  token: string;
  user: UserDto;
  expired: string;
}
