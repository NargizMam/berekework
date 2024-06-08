export interface ApplicationResponse {
  _id: string;
  createdAt: string;
  createdBy: string;
  employerStatus: string;
  userStatus: string;
  isDeletedByEmployer: boolean;
  isDeletedByUser: boolean;
  user: {
    _id: string;
    name: string;
    surname: string;
    dateOfBirth: string;
    preferredJob: string;
    contacts: {
      phone: string;
    };
  };
  vacancy: {
    _id: string;
    vacancyTitle: string;
  };
}
