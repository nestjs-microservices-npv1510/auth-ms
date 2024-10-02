import { PartialType } from '@nestjs/mapped-types';
import { IsJWT, IsString } from 'class-validator';
import MessagePayloadDto from 'src/common/dtos/message-payload.dto';

export class VerifyTokenDto extends PartialType(MessagePayloadDto) {
  @IsJWT()
  @IsString()
  token: string;
}
