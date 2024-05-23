import LastNewsBlock from '../../widgets/lastNewsBlock/ui/LastNewsBlock';
import { TitleBlock } from '../../../admin/widgets/titleBlock';
import { VacancyBlock } from '../../../widgets/vacancyBlock';
import ChooseSpecialistBlock from '../../widgets/specialistBlock/ui/ChooseSpecialistBlock';
import { SliceZone, usePrismicDocumentByUID } from '@prismicio/react';
import { MainCards } from '../../../admin/widgets/mainCards';
import { RatesBLock } from '../../widgets/tariff/ui/ratesBLock';

const HomePage = () => {
  const [document] = usePrismicDocumentByUID('pages', 'ps5');

  return (
    <>
      <div style={{ marginTop: 100 }}>
        <SliceZone
          slices={document?.data.body}
          components={{
            titleblock: TitleBlock,
            maincard: MainCards,
            choosespecialist: ChooseSpecialistBlock,
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
      <LastNewsBlock
        title="Последние новости"
        data={[
          {
            _id: '1',
            cardTitle: 'Природные катастрофы угрожают',
            cardText: 'Извержения вулканов и землетрясения: что делать и как подготовиться?',
            dateTime: '2024-04-21T12:00:00Z',
            buttonUrl: '/natural-disasters',
          },
          {
            _id: '2',
            cardTitle: 'Рост напряженности на Украине',
            cardText: 'Международные обсуждения и реакции на политическую ситуацию',
            dateTime: '2024-04-21T12:00:00Z',
            buttonUrl: '/ukraine-tensions',
          },
          {
            _id: '3',
            cardTitle: 'Экономические прогнозы на следующий квартал',
            cardText: 'Какие изменения ожидаются в мировой экономике и на рынках?',
            dateTime: '2024-04-21T12:00:00Z',
            buttonUrl: '/economic-forecasts',
          },
          {
            _id: '4',
            cardTitle: 'Новые технологии в медицине',
            cardText: 'Искусственный интеллект, биотехнологии и перспективы лечения заболеваний',
            dateTime: '2024-04-21T12:00:00Z',
            buttonUrl: '/medical-technologies',
          },
        ]}
      />
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
