import { UserDto } from '@/Dto/user.dto';

export class LoginDto {
  email: string;
  password: string;
  remember: boolean;
}

export class jwtAuth {
  token: string;
  refreshToken: string;
  user: UserDto;
  expiredToken: string;
  expiredRefreshToken: string;
}
