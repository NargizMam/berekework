export interface Card {
  _id: string;
  cardTitle: string;
  cardText: string;
  dateTime: Date;
  buttonUrl: string;
}

export interface CardMutation {
  cardTitle: string;
  cardText: string;
  buttonUrl: string;
}
