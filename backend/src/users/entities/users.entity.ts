import { Mentor } from '../../mentor/entities/mentor.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Users, (user) => user.participatedConversations)
  participatedConversations: Users[];

  @OneToOne(() => Mentor)
  @JoinColumn()
  mentor_profile: Mentor;
}

export type User = Omit<Users, 'password'>;
