import React from 'react';
import '../css/chooseBlockStyle.css';
import '../css/chooseBlockMedia.css';
// import { useSelector } from 'react-redux';
// import { useAppDispatch } from '../../../../app/store/hooks';
// import { selectChooseBlock } from '../model/chooseBlockSlice';
// import { fetchChooseBlock } from '../api/chooseBlockThunk';

export interface ChooseSpecialistBlockData {
  primary: {
    img: {
      alt: string;
      url: string;
    };
    link: {
      target: string;
      url: string;
    };
    title: string;
  };
}

interface Props {
  slice: ChooseSpecialistBlockData;
}

export const ChooseSpecialistBlock: React.FC<Props> = ({ slice }) => {
  // const dispatch = useAppDispatch();
  // const chooseBlock = useSelector(selectChooseBlock);
  //
  // useEffect(() => {
  //   dispatch(fetchChooseBlock());
  // }, [dispatch]);

  return (
    <div style={{ margin: '100px 0' }} className="chooseBlock">
      <div className="chooseBlockContent">
        <h2 className="chooseBlock-title">{slice.primary.title}</h2>
        <a href={slice.primary.link.url} className="button-link">
          Читать подробнее
          <span className="span"></span>
        </a>
      </div>
      <img className="chooseBlock-img" alt={slice.primary.img.alt} src={slice.primary.img.url} />
    </div>
  );
};
