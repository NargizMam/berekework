export interface NavbarItemFields {
  nameNav: string;
  link: string;
  isDrop: boolean;
  access: string;
  nestedMenu: [
    {
      nestedNameNav: string;
      nestedLink: string;
    },
  ];
}

export interface GalleryVideoType {
  name: string;
  picture?: string;
  video?: string;
  date?: string;
  updatedDate?: string;
}

