export interface Employer {
  _id: string;
  email: string;
  role: string;
  companyName: string;
  foundationYear: string;
  logo: string;
  industry: string;
  description: string;
  address: string;
  contacts: string;
  document: string;
  isPublished: string;
}

export interface EmployerMutation {
  email: string;
  password: string;
  companyName: string;
  logo: File | null;
  foundationYear: string;
  industry: string;
  description: string;
  document: File | null;
  address: string;
  contacts: string;
  avatar: File | null;
}