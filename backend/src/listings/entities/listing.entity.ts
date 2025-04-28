import { User, Users } from '../../users/entities/users.entity';
import { Category } from '../../categories/entities/category.entity';
import { Skill } from '../../skills/entities/skill.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Conversation } from '../../conversations/entities/conversation.entity';

@Entity()
export class Listings {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ fulltext: true })
  @Column()
  title: string;

  @Index({ fulltext: true })
  @Column()
  description: string;

  @ManyToOne(() => Skill, (skill) => skill.offerings, {
    onDelete: 'CASCADE',
  })
  offering_skill: Skill;

  @ManyToOne(() => Skill, (skill) => skill.requests, {
    onDelete: 'CASCADE',
  })
  requested_skill: Skill;

  @Column()
  location: string;

  @Column()
  duration: string;

  @ManyToOne(() => Category, (category) => category.listings, {
    onDelete: 'CASCADE',
  })
  category: Category;

  @ManyToOne(() => Users, (user) => user.listings, {
    onDelete: 'CASCADE',
  })
  user: User;

  @OneToMany(() => Conversation, (conversation) => conversation.listing, {
    onDelete: 'CASCADE',
  })
  conversations: Conversation[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
