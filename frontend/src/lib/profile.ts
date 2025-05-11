import zod from 'zod';
export const aboutProfileSchema = zod.object({
  fullname: zod.string().min(1, 'Full name is requried'),
  email: zod.string().min(1, 'Email is required'),
  countryOfBirth: zod.string().min(1, 'Country of birth is required'),
  category: zod.string().min(1, 'Category is required'),
  skill: zod.string().min(1, 'Skill is required')
});

export type AboutProfile = zod.infer<typeof aboutProfileSchema>;
export type AboutProfileResponse = AboutProfile & {
  id: number;
  country: number;
  skills: {
    id: number;
    name: string;
  };
  skill_category: {
    id: number;
    name: string;
  };
  user: {
    email: string;
    fullname: string;
  };
};

export const certificateSchema = zod.object({
  hasTeachingCertificate: zod.boolean().default(false),
  certificates: zod
    .array(
      zod.object({
        subject: zod.string().min(1, 'Subject is required'),
        name: zod.string().min(1, 'Name is required'),
        description: zod.string().min(1, 'Description is required'),
        issuedBy: zod.string().min(1, 'Issuer is required'),
        start_year: zod.string().min(1, 'Start year is required'),
        end_year: zod.string().min(1, 'End year is required')
      })
    )
    .min(1, 'Certificates are required')
});

export type Certificate = zod.infer<typeof certificateSchema>;

export const educationSchema = zod.object({
  has_education: zod.boolean().default(false),
  educations: zod
    .array(
      zod.object({
        university: zod.string().min(1, 'University is required'),
        degree: zod.string().min(1, 'Degree is required'),
        degree_type: zod.string().min(1, 'Degree type is required'),
        start_year: zod.string().min(1, 'Start year is required'),
        end_year: zod.string().min(1, 'End year is required')
      })
    )
    .min(1, 'Educations are required')
});

export type Education = zod.infer<typeof educationSchema>;

export const descriptionSchema = zod.object({
  introduction: zod.string().min(1, 'Introduction is required'),
  experience: zod.string().min(1, 'Experience is required'),
  motivation: zod.string().min(1, 'Motivation is required'),
  headline: zod.string().min(1, 'Headline is required')
});

export type Description = zod.infer<typeof descriptionSchema>;
