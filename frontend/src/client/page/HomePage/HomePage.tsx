// import { MainCards } from '../../../admin/widgets/mainCards';
import LastNewsBlock from '../../widgets/lastNewsBlock/ui/LastNewsBlock';
import { TitleBlock } from '../../../admin/widgets/titleBlock';
import { VacancyBlock } from '../../../widgets/vacancyBlock';
import ChooseSpecialistBlock from '../../widgets/specialistBlock/ui/ChooseSpecialistBlock';

const HomePage = () => {
  return (
    <>
      {/*<MainCards/>*/}
      <LastNewsBlock />
      <div style={{ marginTop: 100 }}>
        <TitleBlock
          data={{
            title: 'Найди работу, которая делает каждый день интересным',
            location: '/eqq',
            button: {
              url: '/',
              text: 'Перейти к вакансиям',
            },
          }}
        />
      </div>
      <div style={{ marginTop: 100 }}>
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
      <ChooseSpecialistBlock />
      <LastNewsBlock
        data={[
          {
            id: '132',
            cartTitle: '',
            cardText: '',
            dateTime: '',
            buttonUrl: '',
          },
        ]}
      />
    </>
  );
};

export default HomePage;
