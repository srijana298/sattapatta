import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { Mentor } from './mentor.entity';

@Entity()
export class MentorCertificate extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  subject: string;

  @Column({ nullable: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  issuedBy: string;

  @Column({ nullable: true })
  start_year: string;

  @Column({ nullable: true })
  end_year: string;

  @Column({ default: false })
  certificateVerified: boolean;

  @Column({ nullable: true })
  certificateFileUrl: string;

  @ManyToOne(() => Mentor, (mentor) => mentor.certificates, {
    onDelete: 'CASCADE',
  })
  mentor: Mentor;
}
