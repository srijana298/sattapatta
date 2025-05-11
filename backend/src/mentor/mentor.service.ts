import { Injectable } from '@nestjs/common';
import { CreateMentorDto } from './dto/create-mentor.dto';
import {
  AboutMentorDto,
  CertificateDto,
  CreateDescriptionDto,
  EducationDto,
  UpdateMentorDto,
} from './dto/update-mentor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Mentor } from './entities/mentor.entity';
import { Repository } from 'typeorm';
import { Users } from 'src/users/entities/users.entity';
import { MentorCertificate } from './entities/certificate.entity';
import { MentorEducation } from './entities/education.entity';

@Injectable()
export class MentorService {
  constructor(
    @InjectRepository(MentorEducation)
    private readonly educationRepository: Repository<MentorEducation>,

    @InjectRepository(Mentor)
    private readonly mentorRepository: Repository<Mentor>,

    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,

    @InjectRepository(MentorCertificate)
    private readonly certificateRepository: Repository<MentorCertificate>,
  ) {}

  async getEducations(userId: number) {
    return this.mentorRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['user', 'educations'],
      select: {
        id: true,
        has_education: true,
        user: {
          id: true,
        },
        educations: {
          id: true,
          university: true,
          degree: true,
          degree_type: true,
          start_year: true,
          end_year: true,
        },
      },
    });
  }

  async createEducation(id: number, education: EducationDto[]) {
    const educations: MentorEducation[] = [];
    education.forEach((ed) => {
      const data = this.educationRepository.create({
        mentor: {
          id,
        },
        ...ed,
      });
      educations.push(data);
    });

    await this.educationRepository.save(educations);

    return educations;
  }

  async addProfilePicture(id: number, url: string) {
    await this.mentorRepository.update(
      {
        id,
      },
      {
        profilePhotoUrl: url,
      },
    );
  }

  async saveCertificates(id: number, certificates: CertificateDto[]) {
    const response: MentorCertificate[] = [];

    certificates.forEach((certificate) => {
      const entity = this.certificateRepository.create({
        mentor: {
          id,
        },
        ...certificate,
      });
      response.push(entity);
    });
    await this.certificateRepository.save(response);
    return {
      response,
    };
  }

  async deleteCertificates(id: number) {
    return this.certificateRepository.delete({
      id,
    });
  }

  async getCertificates(userId: number) {
    return this.mentorRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['user', 'certificates'],
      select: {
        id: true,
        user: {
          id: true,
        },
        certificates: {
          id: true,
          subject: true,
          issuedBy: true,
          start_year: true,
          end_year: true,
          name: true,
          description: true,
        },
      },
    });
  }

  async getAboutProfile(userId: number) {
    return this.mentorRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['user', 'skill_category', 'skills'],
      select: {
        id: true,
        user: {
          id: true,
          fullname: true,
          email: true,
        },
        countryOfBirth: true,
      },
    });
  }

  async saveAboutProfile(id: number, createAboutProfile: AboutMentorDto) {
    const { countryOfBirth, category, skill } = createAboutProfile;
    await this.mentorRepository.update(
      {
        user: {
          id,
        },
      },
      {
        countryOfBirth,
        skill_category: {
          id: Number(category),
        },
        skills: {
          id: Number(skill),
        },
      },
    );
  }

  create(createMentorDto: CreateMentorDto) {
    return 'This action adds a new mentor';
  }

  findAll() {
    return this.mentorRepository.find({
      relations: ['educations', 'certificates', 'user'],
      select: {
        id: true,
        countryOfBirth: true,
        introduction: true,
        subject: true,
        profilePhotoUrl: true,
        experience: true,
        motivation: true,
        user: {
          id: true,
          email: true,
          fullname: true,
        },
      },
    });
  }

  findOne(id: number) {
    return this.mentorRepository.findOne({
      where: {
        id,
      },
    });
  }

  async getPicture(id: number) {
    return this.mentorRepository.findOne({
      where: {
        id,
      },
      select: {
        id: true,
        profilePhotoUrl: true,
      },
    });
  }

  async findProfile(userId: number) {
    const mentor = await this.mentorRepository.findOne({
      relations: [
        'user',
        'educations',
        'certificates',
        'skill_category',
        'skills',
      ],
      where: {
        user: {
          id: userId,
        },
      },
      select: {
        skill_category: true,
        skills: true,
      },
    });
    return mentor;
  }

  async createDescription(id: number, payload: CreateDescriptionDto) {
    const { introduction, experience, motivation, headline } = payload;
    const data = await this.mentorRepository.update(
      {
        id,
      },
      {
        introduction,
        experience,
        motivation,
        headline,
        isActive: true,
      },
    );
    return data;
  }

  async getDescription(id: number) {
    return this.mentorRepository.findOne({
      where: {
        id,
      },
      select: {
        id: true,
        introduction: true,
        experience: true,
        headline: true,
        motivation: true,
      },
    });
  }

  update(id: number, updateMentorDto: UpdateMentorDto) {
    return `This action updates a #${id} mentor`;
  }

  remove(id: number) {
    return `This action removes a #${id} mentor`;
  }
}
