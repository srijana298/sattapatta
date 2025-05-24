import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';
import {
  ConversationLastMessage,
  Message,
} from 'src/conversations/conversation.types';

@Injectable()
export class WebSocketService {
  private _server: Server | null = null;

  set server(server: Server) {
    this._server = server;
  }

  get server(): Server {
    if (!this._server) {
      throw new Error('Socket.IO server not initialized');
    }
    return this._server;
  }

  emitToRoom(roomId: string, event: string, payload: Message): void {
    console.log(JSON.stringify(payload));
    this.server.to(roomId).emit(event, JSON.stringify(payload));
  }
}
