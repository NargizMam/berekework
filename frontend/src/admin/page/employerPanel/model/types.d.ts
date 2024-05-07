export interface Employer {
  _id: string;
  email: string;
  role: string;
  action: string;
  companyName: string;
  scope: string;
  address: string;
  avatar: string;
  foundationYear: string;
}

export interface EmployerMutation {
  email: string;
  password: string;
  action: string;
  companyName: string;
  scope: string;
  foundationYear: string;
  document: File | null;
  address: string;
  avatar: File | null;
}