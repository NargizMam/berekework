import { SliceZone, usePrismicDocumentByUID } from '@prismicio/react';
import { MainCards } from '../../../admin/widgets/mainCards';
import MediaBlock from '../../widgets/MediaBlock/ui/MediaBlock';
import OurValuesBlock from '../../widgets/ourValues/ui/ourValuesBlock';
import { Box, Typography } from '@mui/material';
import AboutUsBlock from '../../widgets/aboutAsBlock/ui/AboutAsBlock';

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

interface SubtitleProps {
  id: string;
  items: Array<{
    subtitle: Array<{
      type: string;
      text: string;
      spans: any[];
    }>;
  }>;
  primary: {};
}

const AboutUsPage = () => {
  const [document] = usePrismicDocumentByUID('about_us', 'aboutusmain');
  if (!document) {
    return <div>Loading...</div>;
  }

  const getMainTitle = (slice: MainTileProps) => {
    const { aboutusimage, aboutustitle } = slice.primary;
    return (
      <Box
        key={slice.id}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'black',
          marginBottom: '7%',
          flexDirection: { xs: 'column', md: 'row' },
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        <Box>
          {aboutustitle &&
            aboutustitle.map((title) => (
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 'bold',
                  color: 'black',
                  fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' },
                }}
                key={title.text}
              >
                {title.text}
              </Typography>
            ))}
        </Box>
        <Box
          component="img"
          src={aboutusimage.url}
          alt={aboutusimage.alt || 'Image'}
          sx={{
            display: { xs: 'none', sm: 'block' },
            marginLeft: { xs: 0, md: '20px' },
            marginBottom: { xs: '20px', md: 0 },
            maxWidth: { sm: '50%', md: '100%' },
            height: 'auto',
          }}
        />
      </Box>
    );
  };

  const getSubtitle = (slice: SubtitleProps) => {
    return (
      <Box key={slice.id} sx={{ marginBottom: { xs: '7%', md: '60px' } }}>
        {slice.items.map((item, index) => (
          <Typography
            variant="h4"
            key={index}
            sx={{
              fontWeight: '700',
              color: '#000',
              lineHeight: 1.3,
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.875rem' },
            }}
          >
            {item.subtitle[0].text}
          </Typography>
        ))}
      </Box>
    );
  };

  return (
    <>
      <SliceZone
        slices={document.data.body}
        components={{
          aboutusmaintitle: ({ slice }) => getMainTitle(slice),
          aboutusinfo: AboutUsBlock,
          subtitle: ({ slice }) => getSubtitle(slice),
          maincard: MainCards,
          ourvalues: OurValuesBlock,
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
