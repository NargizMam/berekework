import LastNewsBlock from '../../widgets/lastNewsBlock/ui/LastNewsBlock';
import { TitleBlock } from '../../../admin/widgets/titleBlock';
import { VacancyBlock } from '../../../widgets/vacancyBlock';
import ChooseSpecialistBlock from '../../widgets/specialistBlock/ui/ChooseSpecialistBlock';
import { SliceZone, usePrismicDocumentByUID } from '@prismicio/react';
import { MainCards } from '../../../admin/widgets/mainCards';
import { RatesBLock } from '../../widgets/tariff/ui/ratesBLock';

const HomePage = () => {
  const [document] = usePrismicDocumentByUID('pages', 'ps5');
  console.log(document?.data);
  return (
    <>
      <div style={{ marginTop: 100 }}>
        <SliceZone
          slices={document?.data.body}
          components={{
            titleblock: TitleBlock,
            maincard: MainCards,
            choosespecialist: ChooseSpecialistBlock,
            lastnews: LastNewsBlock,
          }}
        />
      </div>
      <div style={{ marginTop: 100 }}>
        {/*<SliceZone*/}
        {/*  slices={document?.data.body}*/}
        {/*  components={{*/}
        {/*    startscreen: StartScreen,*/}
        {/*  }}*/}
        {/*/>*/}
        <VacancyBlock
          data={[
            {
              _id: '1',
              title: 'Менеджер по продажам',
              description: '',
              logo: 'logo',
              company: 'Satcom',
              city: 'Бишкек',
              salary: {
                min: 25000,
                max: 35000,
              },
            },
            {
              _id: '2',
              title: 'Менеджер по продажам',
              description: '',
              logo: 'logo',
              company: 'Satcom',
              city: 'Бишкек',
              salary: {
                min: 25000,
                max: 35000,
              },
            },
            {
              _id: '3',
              title: 'Менеджер по продажам',
              description: '',
              logo: 'logo',
              company: 'Satcom',
              city: 'Бишкек',
              salary: {
                min: 25000,
                max: 35000,
              },
            },
          ]}
        />
      </div>
      <SliceZone
        slices={document?.data.body}
        components={{
          tariff: RatesBLock
        }}
      />
    </>
  );
};

export default HomePage;
