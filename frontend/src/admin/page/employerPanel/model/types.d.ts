export interface Employer {
  _id: string;
  email: string;
  role: string;
  companyName: string;
  foundationYear: string;
  industry: string;
  description: string;
  address: string;
  contacts: string;
  isPublished: string;
  logo: string;
  documents: string;
}

export interface EmployerMutation {
  email: string;
  password: string;
  companyName: string;
  foundationYear: string;
  industry: string;
  description: string;
  document: File |string | null;
  logo: File |string | null;
  address: string;
  contacts: string;
}