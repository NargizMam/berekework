export interface Applicant {
  _id: string,
  user: string,
  firstName: string,
  surname: string,
  secondName: string,
  photo: string | null,
  sex: string,
  dateOfBirth: date,
  country: string,
  city: string,
  education: string,
  aboutApplicant: string,
  workExperience: WorkExperience[],
  wantedJob: string,
  wantedJobCity: string,
}

export type ApplicantMutation = Omit<Applicant, '_id' | 'user'>

export interface WorkExperience {
  id: string,
  job: string,
}