import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Mentor } from './mentor.entity';
import { Users } from '../../users/entities/users.entity';

@Entity()
export class MentorReview extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Mentor, (mentor) => mentor.reviews, {
    onDelete: 'CASCADE',
  })
  mentor: Mentor;

  @ManyToOne(() => Users)
  reviewer: Users;

  @Column({ type: 'int', default: 5 })
  rating: number;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @Column({ type: 'text', nullable: true })
  reply: string;

  @Column({ type: 'date', nullable: true })
  repliedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
