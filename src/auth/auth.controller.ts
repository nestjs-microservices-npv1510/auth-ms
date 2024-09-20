import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('register')
  register() {
    return 'Register successfully';
  }

  @MessagePattern('login')
  login() {
    return 'Login successfully';
  }
}
