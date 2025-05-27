import zod from 'zod';

export const registerUserSchema = zod
  .object({
    email: zod.string().email().min(5).max(100),
    password: zod.string(),
    role: zod.string(),
    fullname: zod.string().min(2).max(100),
    confirm_password: zod.string()
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ['confirm_password']
  });

export type CreateUser = zod.infer<typeof registerUserSchema>;

export type CurrentUser = {
  id: number;
  email: string;
  fullname: string;
  mentor_profile: {
    id: number;
    isActive: boolean;
    profilePhotoUrl: string;
    status: string;
  };
  role: 'mentor' | 'student';
};

export const loginUserSchema = zod.object({
  email: zod.string().email().min(5).max(100),
  password: zod.string()
});

export type LoginUser = zod.infer<typeof loginUserSchema>;
