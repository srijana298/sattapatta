import {
  BaseEntity,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Conversation } from './conversation.entity';
import { Users } from '../../users/entities/users.entity';
import { Message } from './message.entity';

@Entity()
export class ConversationParticipant extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => Conversation, (conversation) => conversation.participants, {
    onDelete: 'CASCADE',
  })
  conversation: Conversation;

  @ManyToOne(() => Users, (user) => user.participatedConversations, {
    onDelete: 'CASCADE',
  })
  user: Users;

  @OneToMany(() => Message, (message) => message.participant)
  messages: Message[];
}
