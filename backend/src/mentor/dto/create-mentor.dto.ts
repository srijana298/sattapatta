import {
  IsString,
  IsEmail,
  IsBoolean,
  IsNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

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

class AvailabilityDto {
  @IsString()
  day_of_week: string;

  @IsString()
  start_time: string;

  @IsString()
  end_time: string;

  @IsBoolean()
  is_available: boolean;
}

export class CreateMentorDto {
  @IsString()
  fullname: string;

  @IsEmail()
  email: string;

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

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AvailabilityDto)
  availability: AvailabilityDto[];
}
