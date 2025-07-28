import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Mentor } from './mentor.entity';

@Entity()
export class MentorAvailability {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  day_of_week: string;

  @Column()
  start_time: string;

  @Column()
  end_time: string;

  @Column()
  is_available: boolean;
}
