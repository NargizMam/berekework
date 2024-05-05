export interface Header {
  logo: string,
  name: string,
  url: string,
  navbarItems: [{
    nameNav: string,
    link: string,
    isDrop: boolean,
    access: string,
    nestedMenu: [{
      nestedNameNav: string,
      nestedLink: string,
    }]
  }]
}
export interface Moderator{
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface ValidationError {
  error: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

