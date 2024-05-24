import React from 'react';
import './ourValues.css';
import OurValuesCard from './ourValuesCard';

interface OurValues {
  items: {
    title: string;
    text: string;
    icon: {
      alt: string;
      url: string;
    };
  }[];
}

interface Props {
  slice: OurValues;
}

const OurValuesBlock: React.FC<Props> = ({slice}) => {

  return (
    <div>
      <p className="ourValuesBlockTitle">Наши ценности</p>
      <div className='ourValuesCardBlock'>
        {slice.items.map(item => (
          <OurValuesCard
            title={item.title}
            text={item.text}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default OurValuesBlock;