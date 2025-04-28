import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  async create(createSkillDto: CreateSkillDto) {
    const skill = new Skill();
    skill.name = createSkillDto.name;
    return await this.skillRepository.save(skill);
  }

  async findAll() {
    const skills = await this.skillRepository.find();
    return skills;
  }

  async findOne(id: number) {
    const skill = await this.skillRepository.findOne({
      where: {
        id,
      },
    });
    return skill;
  }

  async update(skill: Skill, updateSkillDto: UpdateSkillDto) {
    Object.assign(skill, updateSkillDto);
    return await this.skillRepository.save(skill);
  }

  remove(id: number) {
    return `This action removes a #${id} skill`;
  }
}
