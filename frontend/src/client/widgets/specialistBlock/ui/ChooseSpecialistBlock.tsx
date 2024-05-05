import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../css/chooseBlockStyle.css';
import '../css/chooseBlockMedia.css';
import { useAppDispatch } from '../../../../app/store/hooks';
import { selectChooseBlock } from '../model/chooseBlockSlice';
import { fetchChooseBlock } from '../api/chooseBlockThunk';

const ChooseSpecialistBlock = () => {
  const dispatch = useAppDispatch();
  const chooseBlock = useSelector(selectChooseBlock);

  useEffect(() => {
    dispatch(fetchChooseBlock());
  }, [dispatch]);

  return (
    <div style={{margin: '100px 0'}} className="chooseBlock">
      <div className="chooseBlockContent">
        <h2 className="chooseBlock-title">Как выбрать подходящего специалиста?</h2>
        <a href={chooseBlock?.url} className="button-link">
         Читать подробнее
          <span className='span'></span>
        </a>
      </div>
    </div>
  );
};

export default ChooseSpecialistBlock;