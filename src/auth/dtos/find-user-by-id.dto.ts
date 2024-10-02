import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId, IsUUID } from 'class-validator';
import MessagePayloadDto from 'src/common/dtos/message-payload.dto';

export class FindUserByIdDto extends PartialType(MessagePayloadDto) {
  @IsMongoId()
  id: string;
}
