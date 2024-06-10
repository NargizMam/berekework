import { SliceZone, usePrismicDocumentByUID } from '@prismicio/react';
import { components } from '../../../../app/constants/components';

export const ForEmployerPage = () => {
  const [document] = usePrismicDocumentByUID('pages', 'foremployer');

  return (
    <>
      <SliceZone slices={document?.data.body} components={{ ...components }} />
    </>
  );
};
