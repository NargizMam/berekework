export interface HeadingMutation {
  title: string;
  description: string | null;
  image: File | string | null;
  location: string | null;
}

export interface Heading{
  _id: string;
  title: {
    element: string;
  };
  description: {
    element: string;
  };
  location: string;
  image: string | null;
  button: {
    url: string;
    text: string;
  }
}
export interface Company {
  logo: string;
  name: string;
}