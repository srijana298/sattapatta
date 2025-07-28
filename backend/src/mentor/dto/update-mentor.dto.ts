import { PartialType } from '@nestjs/mapped-types';
import { CreateMentorDto } from './create-mentor.dto';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateMentorDto extends PartialType(CreateMentorDto) {}

export class AboutMentorDto {
  @IsNotEmpty()
  countryOfBirth: string;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  skill: string;
}

export class CertificateDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  @IsNotEmpty({ message: 'Subject is required' })
  subject: string;

  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @IsString()
  @IsNotEmpty({ message: 'Issuer is required' })
  issuedBy: string;

  @IsString()
  @IsNotEmpty({ message: 'Start year is required' })
  start_year: string;

  @IsString()
  @IsNotEmpty({ message: 'End year is required' })
  end_year: string;
}

export class CreateCertificateInputDto {
  @IsBoolean()
  @IsOptional()
  hasTeachingCertificate?: boolean = false;

  @IsArray()
  @Type(() => CertificateDto)
  certificates: CertificateDto[];
}

export class EducationDto {
  @IsString()
  @IsNotEmpty({ message: 'University is required' })
  university: string;

  @IsString()
  @IsNotEmpty({ message: 'Degree is required' })
  degree: string;

  @IsString()
  @IsNotEmpty({ message: 'Description is required' })
  degree_type: string;

  @IsString()
  @IsNotEmpty({ message: 'Start year is required' })
  start_year: string;

  @IsString()
  @IsNotEmpty({ message: 'End year is required' })
  end_year: string;
}

export class CreateEducationDto {
  @IsBoolean()
  @IsOptional()
  has_education?: boolean = false;

  @IsArray()
  @Type(() => EducationDto)
  educations: EducationDto[];
}

export class CreateDescriptionDto {
  @IsNotEmpty()
  introduction: string;

  @IsNotEmpty()
  experience: string;

  @IsNotEmpty()
  motivation: string;

  @IsNotEmpty()
  headline: string;
}

export class AvailabilityDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  @IsNotEmpty({ message: 'Day of week is required' })
  day_of_week: string;

  @IsString()
  @IsNotEmpty({ message: 'Start time is required' })
  start_time: string;

  @IsString()
  @IsNotEmpty({ message: 'End time is required' })
  end_time: string;

  @IsBoolean()
  @IsOptional()
  is_available: boolean = true;
}

export class DashboardStatsDto {
  upcomingSessions: number;
  uniqueStudentsCount: number;
  averageRating: number;
  totalReviews: number;
}
