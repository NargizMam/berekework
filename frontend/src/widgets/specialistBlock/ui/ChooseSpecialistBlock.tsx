import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectChooseBlock } from '../model/chooseBlockSlice.ts';
import { fetchChooseBlock } from '../api/chooseBlockThunk.ts';
import { useAppDispatch } from '../../../app/store/hooks.ts';
import { apiURL } from '../../../constants.ts';
import '../css/chooseBlockStyle.css';
import '../css/chooseBlockMedia.css';

const ChooseSpecialistBlock = () => {
  const dispatch = useAppDispatch();
  const chooseBlock = useSelector(selectChooseBlock);

  useEffect(() => {
    dispatch(fetchChooseBlock());
  }, [dispatch]);

  return (
    <div className="chooseBlock">
      <div className="chooseBlockContent">
        <h2 className="chooseBlock-title">{chooseBlock?.title}</h2>
        <a className="button-link">
          {chooseBlock?.link}
          <span></span>
        </a>
      </div>
      <img
        className="chooseBlock-img"
        src={chooseBlock?.image ? apiURL + '/' + chooseBlock.image : ''}
        alt="artist-img"
      />
    </div>
  );
};

export default ChooseSpecialistBlock;