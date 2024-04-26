
export interface Card {
    id: string,
    cardTitle: string,
    cardText: string,
    buttonUrl: string
}

export interface CardMutation {
    cardTitle: string,
    cardText: string,
    buttonUrl: string
}