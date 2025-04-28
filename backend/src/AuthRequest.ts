import { Request } from 'express';

export interface UserPayload {
  sub: number;
  email: string;
}

export type UserPayloadKeys = keyof UserPayload;

export interface AuthRequest extends Request {
  user: UserPayload;
}
