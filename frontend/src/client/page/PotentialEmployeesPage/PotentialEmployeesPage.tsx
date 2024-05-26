import PotentialEmployeesPageCardsBlock from '../../../widgets/PotentialEmployeesPageCardsBlock/ui/PotentialEmployeesPageCardsBlock';
import { SliceZone, usePrismicDocumentByUID } from '@prismicio/react';
import PotentialEmployeesStartBlock from '../../widgets/potentialEmployeesStartBlock/ui/potentialEmployeesStartBlock';
const PotentialEmployeesPage = () => {
  const [document] = usePrismicDocumentByUID('pages', 'potentialemployees');
  console.log(document);
  return (
    <>
      <div style={{marginTop: 100}}>
        <SliceZone
          slices={document?.data.body}
          components={{
            startblock: PotentialEmployeesStartBlock,
          }}
        />
      </div>
      <PotentialEmployeesPageCardsBlock
        // title="Сотрудники"
        // data={[
        //   {
        //     _id: '1',
        //     name: 'Арсен Белеков',
        //     photo: '',
        //     profession: 'Графический Дизайнер',
        //     age: 23,
        //     country: 'Кыргызстан',
        //     city: 'Бишкек',
        //     education: 'Высшее',
        //     experience: 4,
        //   },
        //   {
        //     _id: '2',
        //     name: 'Арсен Белеков',
        //     photo: '',
        //     profession: 'Графический Дизайнер',
        //     age: 23,
        //     country: 'Кыргызстан',
        //     city: 'Бишкек',
        //     education: 'Высшее',
        //     experience: 4,
        //   },
        // ]}
      />
    </>
  );
};

export default PotentialEmployeesPage;
