import { useAppSelector } from '../../../app/store/hooks';
import { selectLastNewsBlock } from '../model/lastNewsBlockSlice';

const LastNewsBlock = () => {
  // const [startIndex, setStartIndex] = useState(0);
  // const pageSize = 3;

  const lastNewsBlock = useAppSelector(selectLastNewsBlock);

  console.log(lastNewsBlock);

  console.log('привет');

  return (
    <>
      ПРИВЕТ
    </>
  );
};

export default LastNewsBlock;