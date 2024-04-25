export interface RateBlock {
    _id: string;
    title: string;
    cards: Cards[];
}

export interface Cards {
    _id: string;
    title: string;
    description:  string[];
    url: string,
}
