import { User } from '../../../../app/types';

export type UserMutation = Omit<User, '_id' | 'user' | 'documents' | 'createdAt'>;

export interface WorkExperience {
  _id: string;
  fieldOfWork: string;
  duration: string;
}
