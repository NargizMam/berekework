import LastNewsBlock from '../../widgets/lastNewsBlock/ui/LastNewsBlock';
import { TitleBlock } from '../../../admin/widgets/titleBlock';
import { VacancyBlock } from '../../../admin/widgets/vacancyBlock';
import ChooseSpecialistBlock from '../../widgets/specialistBlock/ui/ChooseSpecialistBlock';
import { SliceZone, usePrismicDocumentByUID } from '@prismicio/react';
import { MainCards } from '../../../admin/widgets/mainCards';

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
        <VacancyBlock/>
      </div>
    </>
  );
};

export default HomePage;
