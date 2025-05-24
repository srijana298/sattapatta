import { Module } from '@nestjs/common';
import { ChatGateway } from './chat-gateway';
import { WebSocketService } from './chat.service';

@Module({
  providers: [ChatGateway, WebSocketService],
  exports: [WebSocketService],
})
export class ChatModule {}
