import { SliceZone, usePrismicDocumentByUID } from '@prismicio/react';
import { MainCards } from '../../../admin/widgets/mainCards';
import Container from '@mui/material/Container';

interface MainTileProps {
  id: string;
  primary: {
    aboutusimage: {
      url: string;
      alt: string | null;
    };
    aboutustitle: Array<{
      type: string;
      text: string;
    }>;
  };
}

interface InfoItem {
  infodescription: Array<{
    type: string;
    text: string;
    spans: any[];
  }>;
  infodescriptiontitle: Array<{
    type: string;
    text: string;
    spans: any[];
  }>;
}

interface AboutUsInfoProps {
  id: string;
  items: InfoItem[];
  primary: {
    infotitle: Array<{
      type: string;
      text: string;
      spans: any[];
    }>;
  };
}

const AboutUsPage = () => {
  const [document] = usePrismicDocumentByUID('about_us', 'aboutusmain');

  if (!document) {
    return <div>Loading...</div>;
  }
  console.log(document.data.body);

  const getMainTitle = (slice: MainTileProps) => {
    const { aboutusimage, aboutustitle } = slice.primary;
    return (
      <div key={slice.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5%'}}>
        <div>
          {aboutustitle && aboutustitle.map((title, index) => (
            <h1 key={index}>{title.text}</h1>
          ))}
        </div>
        <div>
          <img src={aboutusimage.url} alt={aboutusimage.alt || 'Image'} style={{ marginLeft: '20px', marginBottom: '5%' }} />
        </div>
      </div>
    );
  };

  const getAboutUsInfo = (slice: AboutUsInfoProps) => {
    return (
      <div key={slice.id} style={{marginTop: '5%'}}>
        {slice.primary.infotitle && slice.primary.infotitle[0] && (
          <h1>{slice.primary.infotitle[0].text}</h1>
        )}
        {slice.items.map((item, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            {item.infodescriptiontitle && item.infodescriptiontitle[0] && (
              <h2>{item.infodescriptiontitle[0].text}</h2>
            )}
            {item.infodescription && item.infodescription[0] && (
              <p>{item.infodescription[0].text}</p>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <Container>
        <SliceZone
          slices={document.data.body}
          components={{
            aboutusmaintitle: ({ slice }) => getMainTitle(slice),
            aboutusinfo: ({ slice }) => getAboutUsInfo(slice),
            maincard: MainCards,
          }}
        />
      </Container>
    </>
  );
};

export default AboutUsPage;
