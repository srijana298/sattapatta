import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import {
  CreateConversationDto,
  CreateMessageDto,
} from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { AuthGuard } from 'src/auth.guard';
import { AuthRequest } from 'src/AuthRequest';
import { WebSocketService } from 'src/chat/chat.service';

@Controller('conversations')
export class ConversationsController {
  constructor(
    private readonly conversationsService: ConversationsService,

    private readonly wsService: WebSocketService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body() createConversationDto: CreateConversationDto,
    @Req() request: AuthRequest,
  ) {
    const currentUser = request.user;
    return this.conversationsService.create(
      currentUser.id,
      createConversationDto,
    );
  }

  @UseGuards(AuthGuard)
  @Post(':id/messages')
  async create_messages(
    @Body() createMessageDto: CreateMessageDto,
    @Param('id') id: string,
  ) {
    const response = await this.conversationsService.sendMessage(
      +id,
      createMessageDto,
    );

    this.wsService.emitToRoom(id, 'message', {
      id: response.id,
      roomId: id,
      content: response.content,
      created_at: response.created_at,
      participant: {
        id: response.participant.id!,
        user: {
          id: response.participant.user.id,
        },
      },
    });
    return response.id;
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Req() request: AuthRequest) {
    return this.conversationsService.findAll(request.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conversationsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConversationDto: UpdateConversationDto,
  ) {
    return this.conversationsService.update(+id, updateConversationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conversationsService.remove(+id);
  }
}
