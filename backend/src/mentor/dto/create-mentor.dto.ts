import {
  IsString,
  IsBoolean,
  IsNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRatingDto {
  @IsString()
  comment: string;

  @IsNumber()
  mentorId: number;

  @IsNumber()
  rating: number;
}

class CertificateDto {
  @IsString()
  subject: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  issuedBy: string;

  @IsString()
  start_year: string;

  @IsString()
  end_year: string;
}

class EducationDto {
  @IsString()
  university: string;

  @IsString()
  degree: string;

  @IsString()
  degree_type: string;

  @IsString()
  start_year: string;

  @IsString()
  end_year: string;
}

export class CreateMentorDto {
  @IsString()
  countryOfBirth: string;

  @IsNumber()
  category: number;

  @IsNumber()
  skill: number;

  @IsString()
  profile_picture: string;

  @IsBoolean()
  has_certificate: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CertificateDto)
  certificates: CertificateDto[];

  @IsBoolean()
  has_education: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EducationDto)
  educations: EducationDto[];

  @IsString()
  introduction: string;

  @IsString()
  experience: string;

  @IsString()
  motivation: string;

  @IsString()
  headline: string;

  @IsNumber()
  hourly_rate: number;

  @IsNumber()
  trial_rate: number;
}
