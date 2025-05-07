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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  dayOfWeek: string;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @Column()
  isAvailable: boolean;

  @Column({ nullable: true })
  timezone: string;

  @ManyToOne(() => Mentor, (mentor) => mentor.availability, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  mentor: Mentor;
}
