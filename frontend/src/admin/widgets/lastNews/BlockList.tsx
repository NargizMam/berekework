import {useEffect} from 'react';
import {CircularProgress} from "@mui/material";
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks.ts';
import { selectBlocks, selectBlocksLoading } from './blocks/model/blockSlice.ts';
import { fetchBlocks } from './blocks/model/blockThunk.ts';
import BlockItem from './blocks/BlockItem.tsx';



const BlockList = () => {
    const dispatch = useAppDispatch();
    const blocks = useAppSelector(selectBlocks);
    const loading = useAppSelector(selectBlocksLoading);

    useEffect(() => {
        dispatch(fetchBlocks('1')); //заменить при наличии pageId
    }, [dispatch]);


    return (
        <div>
            {loading ?
                (<CircularProgress/>) :
                blocks.map(block => (
                    <BlockItem
                        key={block._id}
                        blockId={block._id}
                        title={block.title}
                        cards={block.cards}
                    />
                ))
            }
        </div>
    );
};

export default BlockList;