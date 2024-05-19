export interface Employer {
  _id: string;
  email: string;
  role: string;
  industry: string;
  companyName: string;
  description: string;
  address: string;
  logo: string;
  document: string;
  foundationYear: string;
}

export interface EmployerMutation {
  email: string;
  avatar: string;
  password: string;
  industry: string;
  companyName: string;
  description: string;
  foundationYear: string;
  contacts: string;
  document: File | null;
  address: string;
  logo: File | null;
}