import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Conversation } from './conversation.entity';
import { ConversationParticipant } from './participant.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  conversation: Conversation;

  @ManyToOne(
    () => ConversationParticipant,
    (participant) => participant.messages,
  )
  participant: ConversationParticipant;

  @Column({ type: 'text' })
  content: string;
}
