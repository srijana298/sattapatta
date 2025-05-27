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

  @ManyToOne(() => Mentor, (mentor) => mentor.reviews)
  mentor: Mentor;

  @ManyToOne(() => Users)
  reviewer: Users;

  @Column({ type: 'int', default: 5 })
  rating: number; // 1-5 stars

  @Column({ type: 'text', nullable: true })
  comment: string;

  @Column({ nullable: true })
  session_type: string; // 'trial' or 'regular'

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
