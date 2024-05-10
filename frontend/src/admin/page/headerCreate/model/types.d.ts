export interface HeaderMutation {
  logo: File | null | string;
  name: string;
  url: string;
  navbarItems: NavbarItemMutation[];
}

export interface NavbarItemMutation {
  nameNav: string;
  link: string | null;
  isDrop: boolean;
  access: string;
  nestedMenu: NestedMenuMutation[];
}

export interface NestedMenuMutation {
  nestedNameNav: string;
  nestedLink: string;
}

export interface IHeader {
  _id: string;
  logo: string;
  name: string;
  url: string;
  navbarItems: {
    _id: string;
    nameNav: string;
    link: string;
    isDrop: boolean;
    access: string;
    nestedMenu: {
      _id: string;
      nestedNameNav: string;
      nestedLink: string;
    }[];
  }[];
}