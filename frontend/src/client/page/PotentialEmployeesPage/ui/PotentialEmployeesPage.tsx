import { SliceZone, usePrismicDocumentByUID } from '@prismicio/react';
import { components } from '../../../../app/constants/components';

export const PotentialEmployeesPage = () => {
  const [document] = usePrismicDocumentByUID('pages', 'potentialemployees');
  return (
    <>
      <div style={{ marginTop: 100 }}>
        <SliceZone slices={document?.data.body} components={{ ...components }} />
      </div>
    </>
  );
};
