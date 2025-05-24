import { IsNotEmpty } from 'class-validator';

export class CreateConversationDto {
  @IsNotEmpty()
  receiver_id: number;
}

export class CreateMessageDto {
  @IsNotEmpty()
  participant: number;

  @IsNotEmpty()
  content: string;
}
