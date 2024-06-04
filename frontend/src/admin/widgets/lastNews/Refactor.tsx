import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { BlockMutation } from './blocks/blockTypes';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { selectBlock, selectOneBlockLoading } from './blocks/model/blockSlice';
import { addBlock, fetchBlock } from './blocks/model/blockThunk';
import BlockForm from './blocks/BlockForm';

const Refactor = () => {
  const { id } = useParams();
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
      <BlockForm block={block} onSubmit={onFormSubmit} loading={loading} />
    </div>
  );
};

export default Refactor;
