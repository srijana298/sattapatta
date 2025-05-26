import zod from 'zod';
export const profileSchema = zod
  .object({
    fullname: zod.string().min(1, 'Full name is required'),
    email: zod.string().email('Invalid email format').min(1, 'Email is required'),
    countryOfBirth: zod.string().min(1, 'Country of birth is required'),
    category: zod.string().min(1, 'Category is required'),
    skill: zod.string().min(1, 'Skill is required'),
    profile_picture: zod.instanceof(File),
    has_certificate: zod.boolean().default(false),
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
      .optional(),
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
      .optional(),
    introduction: zod.string().min(1, 'Introduction is required'),
    experience: zod.string().min(1, 'Experience is required'),
    motivation: zod.string().min(1, 'Motivation is required'),
    headline: zod.string().min(1, 'Headline is required'),
    hourly_rate: zod
      .number()
      .default(1000),
    trial_rate: zod
      .number()
      .default(50),
    availability: zod.array(
      zod.object({
        day_of_week: zod.string().min(1, 'Day of week is required'),
        start_time: zod.string().min(1, 'Start time is required'),
        end_time: zod.string().min(1, 'End time is required'),
        is_available: zod.boolean().default(true) 
      })
    ).min(1, 'At least one availability is required'),
  })
  .superRefine((data, ctx) => {
    if (!data.has_education) {
      if (!data.educations || data.educations.length === 0) {
        ctx.addIssue({
          path: ['educations'],
          code: zod.ZodIssueCode.custom,
          message: 'Educations are required when has education is true'
        });
      }

      if (!data.has_certificate) {
        if (!data.certificates || data.certificates.length === 0) {
          ctx.addIssue({
            path: ['certificates'],
            code: zod.ZodIssueCode.custom,
            message: 'Certificates are required when teaching certificate is true'
          });
        }
      }
    }
  });


  export type Profile = zod.infer<typeof profileSchema>;