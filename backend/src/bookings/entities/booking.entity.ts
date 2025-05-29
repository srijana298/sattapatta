import { Users } from '../../users/entities/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity()
export class Booking extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.mentorBookings)
  mentor: Users;

  @ManyToOne(() => Users, (user) => user.menteeBookings)
  mentee: Users;

  @Column({ type: 'date' })
  start_date: string;

  @Column({ type: 'tinytext' })
  end_time: string;

  @Column({ default: 'confirmed' })
  status: 'confirmed' | 'cancelled' | 'completed';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
