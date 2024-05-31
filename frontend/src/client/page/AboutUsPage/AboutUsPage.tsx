import { SliceZone, usePrismicDocumentByUID } from '@prismicio/react';
import { MainCards } from '../../../admin/widgets/mainCards';
import Container from '@mui/material/Container';
import MediaBlock from '../../widgets/MediaBlock/ui/MediaBlock';
import OurValuesBlock from '../../widgets/ourValues/ui/ourValuesBlock';
import { Box, Typography } from '@mui/material';

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
          {aboutustitle && aboutustitle.map((title) => (
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

  const getAboutUsInfo = (slice: AboutUsInfoProps) => {
    return (
      <Box key={slice.id} sx={{ margin: '7% auto' }}>
        {slice.primary.infotitle && slice.primary.infotitle[0] && (
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
              fontWeight: 'bold',
              color: 'black',
              marginBottom: '20px'
            }}
          >
            {slice.primary.infotitle[0].text}
          </Typography>
        )}

        {slice.items.map((item, index) => (
          <Box key={index} sx={{ marginBottom: '20px' }}>
            {item.infodescriptiontitle && item.infodescriptiontitle[0] && (
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' },
                  fontWeight: 'bold',
                  color: 'black',
                  marginBottom: '10px',
                  pl: '15px'
                }}
              >
                {item.infodescriptiontitle[0].text}
              </Typography>
            )}
            {item.infodescription && item.infodescription[0] && (
              <Typography
                variant="body1"
                sx={{
                  color: 'black',
                  fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' }
                }}
              >
                {item.infodescription[0].text}
              </Typography>
            )}
          </Box>
        ))}
      </Box>
    );
  };

  const getSubtitle = (slice: SubtitleProps) => {
    return (
      <Box key={slice.id} sx={{ my: '7%' }}>
        {slice.items.map((item, index) => (
          <Typography variant="h4" key={index} sx={{ fontWeight: 'bold', color: 'black', fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}>
            {item.subtitle[0].text}
          </Typography>
        ))}
      </Box>
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
            subtitle: ({ slice }) => getSubtitle(slice),
            maincard: MainCards,
            ourvalues: OurValuesBlock,
            galleryblock: ({ slice }) => (
              <MediaBlock className="gallery" slice={slice} style={{ marginBottom: '180px' }} />
            ),
            videoblock: ({ slice }) => <MediaBlock className="video" slice={slice} style={{ marginBottom: '100px' }} />,
          }}
        />
      </Container>
    </>
  );
};

export default AboutUsPage;
