export interface LastNewsBlockApiData {
  _id: string;
  title: string;
  page: string;
  cards: LastNewsCardApiData[];
}

export interface LastNewsCardApiData {
  _id: string,
  cardTitle: string,
  cardText: string,
  dateTime: Date,
  buttonUrl: string,
}




