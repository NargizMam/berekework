import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { selectBlocksLoading } from './blocks/model/blockSlice';
import { BlockMutation } from './blocks/blockTypes';
import { addBlock } from './blocks/model/blockThunk';
import BlockForm from './blocks/BlockForm';

const AddBlock = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectBlocksLoading);

  const onFormSubmit = async (blockMutation: BlockMutation) => {
    try {
      await dispatch(addBlock({ blockMutation })).unwrap();
    } catch {
      //
    }
  };

  return (
    <>
      <BlockForm block={null} loading={loading} onSubmit={onFormSubmit} />
    </>
  );
};

export default AddBlock;
