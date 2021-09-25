import { Document } from 'mongoose';

export interface UserDoc extends Document {
  nickname: string;
  email: string;
  password: string;
}
