import { SliceZone, usePrismicDocumentByUID } from '@prismicio/react';
import PotentialEmployeesStartBlock from '../../widgets/potentialEmployeesStartBlock/ui/potentialEmployeesStartBlock';
import PotentialEmployeesPageCardsBlock from '../../widgets/PotentialEmployeesPageCardsBlock/ui/PotentialEmployeesPageCardsBlock';

const PotentialEmployeesPage = () => {
  const [document] = usePrismicDocumentByUID('pages', 'potentialemployees');
  console.log(document);
  return (
    <>
      <div style={{ marginTop: 100 }}>
        <SliceZone
          slices={document?.data.body}
          components={{
            startblock: PotentialEmployeesStartBlock,
            potentialemployeescardsblock: PotentialEmployeesPageCardsBlock,
          }}
        />
      </div>
    </>
  );
};

export default PotentialEmployeesPage;
