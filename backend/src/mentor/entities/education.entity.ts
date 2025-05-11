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
export class MentorEducation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  university: string;

  @Column({ nullable: true })
  degree: string;

  @Column({ nullable: true })
  degree_type: string;

  @Column({ nullable: true })
  start_year: string;

  @Column({ nullable: true })
  end_year: string;

  @ManyToOne(() => Mentor, (mentor) => mentor.educations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  mentor: Mentor;
}
