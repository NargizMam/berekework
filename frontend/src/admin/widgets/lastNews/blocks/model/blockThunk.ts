import {createAsyncThunk} from '@reduxjs/toolkit';
import { Block, BlockMutation } from '../blockTypes';
import axiosApi from '../../../../../app/axiosApi';

export const fetchBlocks = createAsyncThunk<Block[],  string >(
    'block/fetchAll',
    async (pageId) => {
        const response = await axiosApi.get<Block[]>( `/last-news-block?pageId=${pageId}`);
        return response.data;
    },
);

export const getLastNewsBlock = createAsyncThunk<Block[] | Block, string | undefined>(
  'lastNewsBlock/geLastNewsBlock',
  async (pageId: string | undefined) => {
    let url = '/last-news-block';

    if (pageId) {
      url += `/?pageId=${pageId}`;
    }

    const response = await axiosApi.get<Block[] | Block>(url);
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
