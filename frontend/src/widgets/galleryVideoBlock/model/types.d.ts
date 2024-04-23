export interface GalleryVideoBlockApiData {
  _id: string;
  title: string;
  page: string;
  cards: GalleryVideoCardApiData[];
}

export interface GalleryVideoCardApiData {
  _id: string;
  image?: string;
  video?: string;
}
