
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks.ts';
import { selectBlock, selectOneBlockLoading } from './blocks/model/blockSlice.ts';
import { addBlock, fetchBlock } from './blocks/model/blockThunk.ts';
import { BlockMutation } from './blocks/blockTypes';
import BlockForm from './blocks/BlockForm.tsx';


const Refactor = () => {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const block = useAppSelector(selectBlock);
    const loading = useAppSelector(selectOneBlockLoading);

    useEffect(() => {
        if (id) {
            dispatch(fetchBlock(id));
        }
    }, [id, dispatch]);
    const onFormSubmit = async (blockMutation: BlockMutation) => {
        try {
            if (id) {
                await dispatch(addBlock({ blockMutation, id })).unwrap();
            }
        } catch {
            //
        }
    };

    return (
        <div>
            <BlockForm block={block} onSubmit={onFormSubmit} loading={loading}/>
        </div>
    );
};

export default Refactor;