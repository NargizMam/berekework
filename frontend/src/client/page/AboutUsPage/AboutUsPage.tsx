import { SliceZone, usePrismicDocumentByUID } from '@prismicio/react';
import { MainCards } from '../../../admin/widgets/mainCards';
import Container from '@mui/material/Container';

interface MainTileProps {
  id: string;
  items: Array<{
    aboutusimage: {
      url: string;
      alt: string | null;
    };
    aboutustitle: Array<{
      type: string;
      text: string;
    }>;
  }>;
}

const AboutUsPage = () => {
  const [document] = usePrismicDocumentByUID('about_us', 'aboutusmain');

  if (!document) {
    return <div>Loading...</div>;
  }

  const getMainTitle = (slice: MainTileProps) => {
    return (
      <div key={slice.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {slice.items.map((item, index) => (
            <div key={index}>
              {item.aboutustitle.map((title, i) => (
                <div key={i}>
                  {title.type === 'heading2' && <h1>{title.text}</h1>}
                </div>
              ))}
            </div>
          ))}
        <div>
          {slice.items.map((item, index) => (
            <img key={index} src={item.aboutusimage.url} alt={item.aboutusimage.alt || 'Image'} style={{ marginLeft: '20px' }} />
          ))}
        </div>
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
            maincard: MainCards,
          }}
        />
      </Container>
    </>
  );
};

export default AboutUsPage;
