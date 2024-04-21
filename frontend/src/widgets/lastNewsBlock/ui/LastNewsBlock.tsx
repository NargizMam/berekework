import { useAppSelector } from '../../../app/store/hooks';
import { selectLastNewsBlockbyId } from '../model/lastNewsBlockSlice';

const LastNewsBlock = () => {
  // const [startIndex, setStartIndex] = useState(0);
  // const pageSize = 3;

  const lastNewsBlock = useAppSelector(selectLastNewsBlockbyId);

  console.log(lastNewsBlock);

  console.log('привет');

  return (
    <>
      Последние новости
    </>
  );
};

export default LastNewsBlock;