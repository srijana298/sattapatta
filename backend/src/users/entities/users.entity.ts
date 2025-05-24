import { Booking } from '../../bookings/entities/booking.entity';
import { ConversationParticipant } from '../../conversations/entities/participant.entity';
import { Mentor } from '../../mentor/entities/mentor.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToOne,
} from 'typeorm';

@Entity()
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: 'student' })
  role: string;

  @Column()
  password: string;

  @OneToMany(() => ConversationParticipant, (user) => user.user)
  participatedConversations: ConversationParticipant[];

  @OneToOne(() => Mentor, (mentor) => mentor.user, { nullable: true })
  mentor_profile: Mentor;

  @OneToMany(() => Booking, (booking) => booking.mentor)
  mentorBookings: Booking[];

  @OneToMany(() => Booking, (booking) => booking.mentee)
  menteeBookings: Booking[];
}

export type User = Omit<Users, 'password'>;
