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
  password: string;
  industry: string;
  companyName: string;
  description: string;
  foundationYear: string;
  document: File | null;
  address: string;
  logo: File | null;
}