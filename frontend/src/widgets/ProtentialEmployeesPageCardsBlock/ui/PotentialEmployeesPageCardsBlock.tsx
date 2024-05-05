import React from 'react';
import PotentialEmployeesPageCard, { PotentialEmployeesPageCardProps } from './PotentialEmployeesPageCard';
import './PotentialEmployeesPageCardsBlock.css';

export interface Props {
  title: string;
  data: PotentialEmployeesPageCardProps[];
}

const PotentialEmployeesPageCardsBlock: React.FC<Props> = ({ title, data }) => {
  return (
    <div className="PotentialEmployeesPageCardsBlock__container">
      <h2 className="PotentialEmployeesPageCardsBlock__title">{title}</h2>
      <div className="PotentialEmployeesPageCardsBlock__cards">
        {data.map((card) => (
          <PotentialEmployeesPageCard key={card._id} data={card} />
        ))}
      </div>
    </div>
  );
};

export default PotentialEmployeesPageCardsBlock;
