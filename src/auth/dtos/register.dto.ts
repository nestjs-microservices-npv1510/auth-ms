import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import MessagePayloadDto from 'src/common/dtos/message-payload.dto';

export class RegisterDto extends PartialType(MessagePayloadDto) {
  @IsString()
  @IsOptional()
  id: number;

  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword()
  password: string;
}
