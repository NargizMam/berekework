import { SliceZone, usePrismicDocumentByUID } from '@prismicio/react';
import { components } from '../../../app/constants/components';

const AboutUsPage = () => {
  const [document] = usePrismicDocumentByUID('pages', 'aboutus');
  if (!document) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <SliceZone
        slices={document.data.body}
        components={{...components}}
      />
    </>
  );
};

export default AboutUsPage;
