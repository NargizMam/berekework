export interface GalleryVideoBlockApiData {
  _id: string;
  page: string;
  title: string;
  cards: GalleryVideoCardApiData[];
}

export interface GalleryVideoCardApiData {
  _id?: string;
  image?: string;
  video?: string;
}
