import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Mentor } from './mentor.entity';

@Entity()
export class MentorEducation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  hasHigherEducation: boolean;

  @Column({ nullable: true })
  university: string;

  @Column({ nullable: true })
  degree: string;

  @Column({ nullable: true })
  degreeType: string;

  @Column({ nullable: true })
  specialization: string;

  @Column({ nullable: true })
  startYear: string;

  @Column({ nullable: true })
  endYear: string;

  @Column({ nullable: true })
  diplomaVerified: boolean;

  @Column({ nullable: true })
  diplomaFileUrl: string;

  @ManyToOne(() => Mentor, (mentor) => mentor.education, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  mentor: Mentor;
}
