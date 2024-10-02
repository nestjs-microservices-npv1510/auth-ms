import { Controller, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

// Dtos
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { VerifyTokenDto } from './dtos/verify-token.dto';
import { FindUserByIdDto } from './dtos/find-user-by-id.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.register.user')
  register(@Payload() registerDto: RegisterDto) {
    const { metadata, ...dto } = registerDto;
    // return dto;
    return this.authService.register(dto);
  }

  @MessagePattern('auth.register.login')
  login(@Payload() loginDto: LoginDto) {
    const { metadata, ...dto } = loginDto;
    // return dto;
    return this.authService.login(dto);
  }

  @MessagePattern('auth.register.verify-token')
  verifyToken(@Payload() verifyTokenDto: VerifyTokenDto) {
    const { metadata, token } = verifyTokenDto;
    // console.log('auth controller verifyToken');
    // console.log(token);
    return this.authService.verifyToken(token);
  }

  @MessagePattern('auth.findUserById')
  async findUserById(@Payload() findUserByIdDto: FindUserByIdDto) {
    // console.log('auth controller findUserById');
    const { metadata, id } = findUserByIdDto;
    // console.log(id);
    // return id;
    return await this.authService.findUserById(id);
  }
}
