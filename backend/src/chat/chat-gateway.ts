import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WebSocketService } from './chat.service';
import { Injectable } from '@nestjs/common';
import {
  ConversationLastMessage,
  Message,
} from 'src/conversations/conversation.types';

@WebSocketGateway(3005, { cors: { origin: '*' } })
@Injectable()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly wsService: WebSocketService) {}

  handleConnection(@ConnectedSocket() client: Socket): void {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(@ConnectedSocket() client: Socket): void {
    console.log('Client disconnected:', client.id);
  }

  afterInit(server: Server): void {
    this.wsService.server = server;
  }

  @SubscribeMessage('join-room')
  async handleJoinRoom(
    @MessageBody() roomId: string,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    await client.join(roomId);
    console.log(`Client ${client.id} joined room ${roomId}`);
  }

  @SubscribeMessage('message')
  handleNewMessage(@MessageBody() message: Message): void {
    console.log('New message:', message);
    this.wsService.emitToRoom(message.roomId, 'message', message);
  }
}
