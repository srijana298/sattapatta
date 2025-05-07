import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Mentor } from './mentor.entity';

@Entity()
export class MentorCertificate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  hasTeachingCertificate: boolean;

  @Column({ nullable: true })
  subject: string;

  @Column({ nullable: true })
  certificateName: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  issuedBy: string;

  @Column({ nullable: true })
  startYear: string;

  @Column({ nullable: true })
  endYear: string;

  @Column({ default: false })
  certificateVerified: boolean;

  @Column({ nullable: true })
  certificateFileUrl: string;

  @ManyToOne(() => Mentor, (mentor) => mentor.certificates, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  mentor: Mentor;
}
