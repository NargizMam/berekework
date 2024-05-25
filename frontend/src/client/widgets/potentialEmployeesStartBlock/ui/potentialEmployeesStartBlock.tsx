import React from 'react';
import './PotentialEmployeesStartBlock.css';

interface StartBlock {
  primary: {
    img: {
      alt: string;
      url: string
    };
    title: string;
    text: string;
  };
}

interface Props {
  slice: StartBlock;
}
const PotentialEmployeesStartBlock: React.FC<Props> = ({ slice }) => {
  return (
    <div className='startBlock'>
      <div className='textBlock'>
        <p className="startBlockTitle">{slice.primary.title}</p>
        <p className="startBlockText">{slice.primary.text}</p>
      </div>
      <img className="startBlockImg" alt={slice.primary.img.alt} src={slice.primary.img.url}/>
    </div>
  );
};

export default PotentialEmployeesStartBlock;