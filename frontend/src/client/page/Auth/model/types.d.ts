export interface RegisterMutation {
  email: string;
  password: string;
  avatar: File | null;
}