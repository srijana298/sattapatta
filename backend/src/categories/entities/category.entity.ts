import { Mentor } from '../../mentor/entities/mentor.entity';
import { Skill } from '../../skills/entities/skill.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Skill, (skill) => skill.category)
  skills: Skill[];

  @OneToMany(() => Mentor, (m) => m.skill_category)
  mentors: Mentor[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
