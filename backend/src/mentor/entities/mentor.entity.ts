import { Skill } from '../../skills/entities/skill.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BaseEntity,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { MentorEducation } from './education.entity';
import { MentorCertificate } from './certificate.entity';
import { MentorAvailability } from './availability.entity';
import { Users } from '../../users/entities/users.entity';
import { Category } from '../../categories/entities/category.entity';

@Entity()
export class Mentor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  countryOfBirth: string;

  @ManyToOne(() => Category, (c) => c.mentors)
  skill_category: Category;

  @ManyToOne(() => Skill, (skill) => skill.mentors)
  skills: Skill;

  @Column({ nullable: true })
  subject: string;

  @Column({ nullable: true })
  profilePhotoUrl: string;

  @Column({ type: 'text', nullable: true })
  introduction: string;

  @Column({ type: 'text', nullable: true })
  experience: string;

  @Column({ type: 'text', nullable: true })
  motivation: string;

  @Column({ nullable: true })
  headline: string;

  @Column({ default: false })
  has_education: boolean;

  @OneToMany(() => MentorEducation, (education) => education.mentor, {
    cascade: true,
  })
  educations: MentorEducation[];

  @Column({ default: false })
  has_certificate: boolean;

  @OneToMany(() => MentorCertificate, (certificate) => certificate.mentor, {
    cascade: true,
  })
  certificates: MentorCertificate[];

  @OneToMany(() => MentorAvailability, (availability) => availability.mentor, {
    cascade: true,
  })
  availability: MentorAvailability[];

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: false })
  isActive: boolean;

  @OneToOne(() => Users, (user) => user.mentor_profile)
  @JoinColumn({ name: 'users_id' })
  user: Users;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
