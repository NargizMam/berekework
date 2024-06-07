export interface RegisterMutation {
  name: string;
  surname: string;
  email: string;
  password: string;
  avatar: File | null;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface GlobalError {
  error: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  employer: EmployerAuth;
}

export interface User {
  _id: string;
  email: string;
  token: string;
  role: string;
  avatar: string;
}

export interface EmployerAuth {
  _id: string;
  email: string;
  token: string;
  role: string;
  isPublished?: boolean;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}
