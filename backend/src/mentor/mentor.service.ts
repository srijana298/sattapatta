import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMentorDto, CreateRatingDto } from './dto/create-mentor.dto';
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
import { MentorAvailability } from './entities/availability.entity';
import { MentorReview } from './entities/rating.entity';

@Injectable()
export class MentorService {
  constructor(
    @InjectRepository(MentorEducation)
    private readonly educationRepository: Repository<MentorEducation>,

    @InjectRepository(Mentor)
    private readonly mentorRepository: Repository<Mentor>,

    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,

    @InjectRepository(MentorAvailability)
    private readonly availabilityRepository: Repository<MentorAvailability>,

    @InjectRepository(MentorCertificate)
    private readonly certificateRepository: Repository<MentorCertificate>,

    @InjectRepository(MentorReview)
    private readonly mentorReviewRepository: Repository<MentorReview>,
  ) {}

  async updateStatus(id: number, status: string) {
    await this.mentorRepository.update(
      {
        id,
      },
      {
        status,
      },
    );
  }

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

  async createRating(userId: number, dto: CreateRatingDto) {
    const review = new MentorReview();
    Object.assign(review, {
      mentor: {
        id: dto.mentorId,
      },
      reviewer: userId,
      rating: dto.rating,
      comment: dto.comment,
    });
    const saved = await this.mentorReviewRepository.save(review);
    return saved.id;
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
        has_certificate: true,
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

  async create(userId: number, createMentorDto: CreateMentorDto) {
    const foundMentor = await this.mentorRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
      select: {
        id: true,
        user: {
          id: true,
        },
      },
    });

    if (foundMentor) {
      throw new BadRequestException(
        'Mentor profile already exists for this user',
      );
    }

    const {
      countryOfBirth,
      category,
      skill,
      profile_picture,
      has_certificate,
      educations,
      has_education,
      introduction,
      experience,
      motivation,
      headline,
      hourly_rate,
      availability,
      trial_rate,
    } = createMentorDto;
    const mentor = new Mentor();
    Object.assign(mentor, {
      countryOfBirth,
      skill_category: category,
      skills: skill,
      profilePhotoUrl: profile_picture,
      has_certificate,
      has_education,
      introduction,
      user: userId,
      experience,
      motivation,
      headline,
      hourly_rate,
      trial_rate,
    });

    const savedMentor = await this.mentorRepository.save(mentor);

    if (has_certificate) {
      const _certificates: MentorCertificate[] = [];
      createMentorDto.certificates.forEach((cert) => {
        const data = this.certificateRepository.create({
          mentor: {
            id: savedMentor.id,
          },
          ...cert,
        });
        _certificates.push(data);
      });

      await this.certificateRepository.save(_certificates);
    }

    if (has_education) {
      const _educations: MentorEducation[] = [];
      educations.forEach((ed) => {
        const data = this.educationRepository.create({
          mentor: {
            id: savedMentor.id,
          },
          ...ed,
        });
        _educations.push(data);
      });

      const saved = await this.educationRepository.save(_educations);
      console.log('Saved educations:', saved);
    }

    const _availabilities: MentorAvailability[] = [];

    availability.forEach((avail) => {
      const data = this.availabilityRepository.create({
        mentor: {
          id: savedMentor.id,
        },
        ...avail,
      });
      _availabilities.push(data);
    });
    await this.availabilityRepository.save(_availabilities);
    return savedMentor;
  }

  findAll(status: string = 'pending') {
    return this.mentorRepository.find({
      relations: [
        'educations',
        'certificates',
        'availabilities',
        'user',
        'skill_category',
        'skills',
      ],
      select: {
        id: true,
        countryOfBirth: true,
        introduction: true,
        profilePhotoUrl: true,
        experience: true,
        status: true,
        motivation: true,
        hourly_rate: true,
        trial_rate: true,
        createdAt: true,
        user: {
          id: true,
          email: true,
          fullname: true,
        },
      },
      where: {
        status,
      },
    });
  }

  async calculateBayesianRating(mentorId: number) {
    const mentorWithReviews = await this.mentorRepository.findOne({
      where: { id: mentorId },
      relations: ['reviews'],
    });

    if (!mentorWithReviews || !mentorWithReviews.reviews?.length) {
      return { bayesianRating: 0, totalReviews: 0, rawAverage: 0 };
    }

    // Calculate the raw average for this mentor
    const mentorRatings = mentorWithReviews.reviews.map(
      (review) => review.rating,
    );
    const rawAverage =
      mentorRatings.reduce((a, b) => a + b, 0) / mentorRatings.length;
    const totalReviews = mentorRatings.length;

    // Get global stats (all ratings across the platform)
    const allReviews = await this.mentorReviewRepository.find();
    const allRatings = allReviews.map((review) => review.rating);
    const globalAverage =
      allRatings.reduce((a, b) => a + b, 0) / allRatings.length;

    // Constants for the Bayesian average
    // C is the mean number of ratings per item
    const C = await this.calculateMeanNumberOfReviews();

    // Calculate Bayesian average: (C × m + R × v) / (C + R)
    // Where:
    // C = weight given to the global average (typically mean number of ratings)
    // m = global average rating
    // R = number of ratings for this item
    // v = raw average rating for this item
    const bayesianRating =
      (C * globalAverage + totalReviews * rawAverage) / (C + totalReviews);

    return {
      bayesianRating: parseFloat(bayesianRating.toFixed(2)),
      totalReviews,
      rawAverage: parseFloat(rawAverage.toFixed(2)),
    };
  }

  // Helper method to calculate the mean number of reviews per mentor
  async calculateMeanNumberOfReviews() {
    // Get count of reviews for each mentor
    const mentors = await this.mentorRepository.find({
      relations: ['reviews'],
    });

    const reviewCounts = mentors.map((mentor) => mentor.reviews?.length || 0);
    const totalMentors = mentors.length || 1; // Avoid division by zero

    // Default to 5 if there are no mentors yet
    return reviewCounts.length
      ? reviewCounts.reduce((a, b) => a + b, 0) / totalMentors
      : 5; // Use 5 as a reasonable starting value
  }

  async findOne(id: number) {
    const mentor = await this.mentorRepository.findOne({
      where: {
        id,
      },
      relations: [
        'educations',
        'certificates',
        'availabilities',
        'user',
        'reviews',
        'skill_category',
        'skills',
      ],
      select: {
        id: true,
        countryOfBirth: true,
        introduction: true,
        profilePhotoUrl: true,
        status: true,
        hourly_rate: true,
        trial_rate: true,
        experience: true,
        motivation: true,
        createdAt: true,
        user: {
          id: true,
          email: true,
          fullname: true,
        },
      },
    });
    if (!mentor) {
      return null;
    }

    const ratingStats = await this.calculateBayesianRating(id);
    return {
      ...mentor,
      ratingStats,
    };
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
