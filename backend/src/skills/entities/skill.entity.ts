import { Category } from '../../categories/entities/category.entity';
import { Mentor } from '../../mentor/entities/mentor.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity()
export class Skill extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Category, (category) => category.skills, {
    onDelete: 'CASCADE',
  })
  category: Category;

  @ManyToMany(() => Mentor, (mentor) => mentor.skills)
  mentors: Mentor[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
