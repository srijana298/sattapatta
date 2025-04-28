import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Conversation } from './conversation.entity';
import { Users } from '../../users/entities/users.entity';
import { Message } from './message.entity';

@Entity()
export class ConversationParticipant {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => Conversation, (conversation) => conversation.participants)
  conversation: Conversation;

  @ManyToOne(() => Users, (user) => user.participatedConversations)
  user: Users;

  @OneToMany(() => Message, (message) => message.participant)
  messages: Message[];
}
