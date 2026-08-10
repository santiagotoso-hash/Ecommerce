import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../users/dto/user.dto';
import { LoginUserDTO } from '../users/dto/loginUser.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() newUserData: CreateUserDTO) {
    return this.authService.signUp(newUserData);
  }

  @Post('signin')
  signIn(@Body() credentials: LoginUserDTO) {
    const { email, password } = credentials;

    return this.authService.signIn(email, password);
  }
}
