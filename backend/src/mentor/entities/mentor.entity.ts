import { Skill } from '../../skills/entities/skill.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  BaseEntity,
} from 'typeorm';
import { MentorEducation } from './education.entity';
import { MentorCertificate } from './certificate.entity';
import { MentorAvailability } from './availability.entity';
import { ManyToOne } from 'typeorm/browser';

@Entity()
export class Mentor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  countryOfBirth: string;

  @ManyToMany(() => Skill, (skill) => skill.mentors)
  @JoinTable({
    name: 'mentor_skills',
    joinColumn: { name: 'mentorId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'skillId', referencedColumnName: 'id' },
  })
  skills: Skill[];

  @Column()
  subject: string;

  @Column({ nullable: true })
  profilePhotoUrl: string;

  // Description - from DescriptionUploadForm
  @Column({ type: 'text', nullable: true })
  introduction: string;

  @Column({ type: 'text', nullable: true })
  experience: string;

  @Column({ type: 'text', nullable: true })
  motivation: string;

  @Column({ nullable: true })
  headline: string;

  // Relations
  @OneToMany(() => MentorEducation, (education) => education.mentor, {
    cascade: true,
  })
  education: MentorEducation[];

  @OneToMany(() => MentorCertificate, (certificate) => certificate.mentor, {
    cascade: true,
  })
  certificates: MentorCertificate[];

  @OneToMany(() => MentorAvailability, (availability) => availability.mentor, {
    cascade: true,
  })
  availability: MentorAvailability[];

  // Status
  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: false })
  isActive: boolean;

  // Timestamps
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
