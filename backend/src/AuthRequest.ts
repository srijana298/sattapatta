import { Request } from 'express';
import { User } from './users/entities/users.entity';

export interface AuthRequest extends Request {
  user: User;
}
