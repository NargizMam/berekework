import LastNewsBlock from '../../../widgets/lastNewsBlock/ui/LastNewsBlock';
import { VacancyBlock } from '../../../../admin/widgets/vacancyBlock';
import { SliceZone, usePrismicDocumentByUID } from '@prismicio/react';
import { components } from '../../../../app/constants/components';

export const HomePage = () => {
  const [document] = usePrismicDocumentByUID('pages', 'ps5');

  return (
    <>
      <div style={{ marginTop: 100 }}>
        <SliceZone slices={document?.data.body} components={{ ...components }} />
      </div>
      <div style={{ marginTop: 100 }}>
        {/*<SliceZone*/}
        {/*  slices={document?.data.body}*/}
        {/*  components={{*/}
        {/*    startscreen: StartScreen,*/}
        {/*  }}*/}
        {/*/>*/}
        <VacancyBlock />
        <LastNewsBlock />
      </div>
    </>
  );
};
