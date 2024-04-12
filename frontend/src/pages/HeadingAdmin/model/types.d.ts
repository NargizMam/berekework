export interface HeadingMutation {
  title: string;
  description: string | null;
  image: File | string | null;
  location: string | null;
}
