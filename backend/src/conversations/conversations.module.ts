import { Module } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { ConversationsController } from './conversations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from './entities/conversation.entity';
import { Message } from './entities/message.entity';
import { ConversationParticipant } from './entities/participant.entity';
import { JwtModule } from '@nestjs/jwt';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  imports: [
    ChatModule,
    JwtModule.register({
      secret: 'your_secret_key',
      signOptions: {
        expiresIn: '24h',
      },
    }),

    TypeOrmModule.forFeature([Conversation, ConversationParticipant, Message]),
  ],
  controllers: [ConversationsController],
  providers: [ConversationsService],
})
export class ConversationsModule {}
