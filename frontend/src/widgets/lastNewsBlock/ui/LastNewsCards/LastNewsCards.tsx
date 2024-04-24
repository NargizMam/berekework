import LastNewsCardItem from './LastNewsCardItem';
import { LastNewsCardApiData } from '../../model/types';

interface Props {
  startIndex: number;
  pageSize?: number;
  cards: LastNewsCardApiData[];
  isPaginationEnabled: boolean;
}

export const LastNewsCards: React.FC<Props> = ({ cards, pageSize, startIndex, isPaginationEnabled }) => {
  let cardsToDisplay = cards;

  if (isPaginationEnabled && pageSize) {
    cardsToDisplay = cards.slice(startIndex, startIndex + pageSize);
  }

  return (
    <div>
      {cardsToDisplay.map((card) => (
        <LastNewsCardItem
          key={card._id}
          cardTitle={card.cardTitle}
          cardText={card.cardText}
          dateTime={card.dateTime}
          buttonUrl={card.buttonUrl}
        />
      ))}
    </div>
  );
};

export default LastNewsCards;
