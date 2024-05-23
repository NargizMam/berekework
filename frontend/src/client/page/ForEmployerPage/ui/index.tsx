import { SliceZone, usePrismicDocumentByUID } from '@prismicio/react';
import { TitleBlock } from '../../../../admin/widgets/titleBlock';
import { RatesBLock } from '../../../widgets/tariff/ui/ratesBLock';
import { MainCards } from '../../../../admin/widgets/mainCards';

export const ForEmployerPage = () => {
  const [document] = usePrismicDocumentByUID('pages', 'foremployer');

  return (
    <>
      <SliceZone
        slices={document?.data.body}
        components={{
          titleblock: TitleBlock,
          maincard: MainCards,
          tariff: RatesBLock
        }}
      />
    </>
  );
};