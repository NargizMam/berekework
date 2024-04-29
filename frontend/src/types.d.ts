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