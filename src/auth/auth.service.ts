import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { RpcException } from '@nestjs/microservices';

// interfaces
import { TokenPayload } from './interfaces/token.interface';

// envs
import * as config from '../config';

// 3-rd packages
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('AuthService');

  constructor(private readonly jwtService: JwtService) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Connected to database !');
  }

  signJwt(payload: TokenPayload) {
    return this.jwtService.signAsync(payload);
  }

  async register(registerDto: RegisterDto) {
    // return registerDto;
    const { email, password, name } = registerDto;
    // return registerDto;

    if (await this.user.findUnique({ where: { email } })) {
      throw new RpcException('Email already exists');
    }

    const newUser = await this.user.create({
      data: { email, password: bcrypt.hashSync(password, 12), name },
    });

    const { id } = newUser;

    // tokens
    const accessToken = await this.signJwt({ id });
    // console.log(accessToken);

    return {
      user: newUser,
      tokens: {
        accessToken,
        // refreshToken: 'def',
      },
    };
  }

  async login(loginDto: LoginDto) {
    // return loginDto;
    const { email, password } = loginDto;

    const user = await this.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password)))
      throw new RpcException('User or password is invalid');

    // tokens
    const accessToken = await this.signJwt({ id: user.id });
    // console.log(accessToken);

    return {
      tokens: {
        accessToken,
      },
    };
  }

  async verifyToken(token: string) {
    // console.log('auth service verifyToken:', token);
    // console.log(token);
    // return token;

    // verify token
    const payload = await this.jwtService.verifyAsync(token);
    // console.log(payload);
    return payload;
  }

  async findUserById(userId: string) {
    const user = await this.user.findUnique({ where: { id: userId } });

    if (!user) throw new RpcException('User not found');

    return user;
  }
}
