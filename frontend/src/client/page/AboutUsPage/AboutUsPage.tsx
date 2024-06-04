import { SliceZone, usePrismicDocumentByUID } from '@prismicio/react';
import { MainCards } from '../../../admin/widgets/mainCards';
import MediaBlock from '../../widgets/MediaBlock/ui/MediaBlock';
import OurValuesBlock from '../../widgets/ourValues/ui/ourValuesBlock';
import AboutUsBlock from '../../widgets/aboutAsBlock/ui/AboutAsBlock';
import { TitleBlock } from '../../../admin/widgets/titleBlock';
import EmployerBlock from '../../widgets/employerBlock/ui/EmployerBlock';

const AboutUsPage = () => {
  const [document] = usePrismicDocumentByUID('pages', 'aboutus');
  if (!document) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <SliceZone
        slices={document.data.body}
        components={{
          titleblock: TitleBlock,
          aboutusinfo: AboutUsBlock,
          maincard: MainCards,
          aboutusvalues: OurValuesBlock,
          potentialemployees: EmployerBlock,
          galleryblock: ({ slice }) => <MediaBlock className="gallery" slice={slice} style={{ marginTop: '176px' }} />,
          videoblock: ({ slice }) => (
            <MediaBlock className="video" slice={slice} style={{ marginTop: '180px', marginBottom: '100px' }} />
          ),
        }}
      />
    </>
  );
};

export default AboutUsPage;
