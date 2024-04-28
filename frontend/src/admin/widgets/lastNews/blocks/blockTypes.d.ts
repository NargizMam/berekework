import {Card} from "./cardTypes";

export interface Block {
    _id: string,
    page: string   //заменить при наличии pageId
    title: string,
    cards:Card[]
}

export type BlockMutation = Omit<Block, '_id'>

