import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../../../../axiosApi.ts';
import { Block, BlockMutation } from '../blockTypes';

export const fetchBlocks = createAsyncThunk<Block[],  string >(
    'block/fetchAll',
    async (pageId) => {
        const response = await axiosApi.get<Block[]>( `/last-news-block?pageId=${pageId}`);
        return response.data;
    },
);

export const fetchBlock = createAsyncThunk<Block,  string >(
    'block/fetchOne',
    async (id) => {
        const response = await axiosApi.get<Block>(`/last-news-block/${id}`);
        return response.data;
    },
);

export const addBlock = createAsyncThunk<
    null,
    { blockMutation: BlockMutation | Block, id?: string }
>('block/add', async ({blockMutation, id}) => {
    console.log(blockMutation);
    const response = await axiosApi.post(id? `/last-news-block?id=${id}` : `/last-news-block?id`, blockMutation);
    return response.data;
});

export const deleteBlock = createAsyncThunk<null, string>(
    'block/delete',
    async (_id: string) => {
        await axiosApi.delete(`/last-news-block/${_id}`);
        return null;
    },
);
