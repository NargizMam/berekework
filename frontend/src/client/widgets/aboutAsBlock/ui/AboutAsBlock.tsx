import { Box, Typography } from '@mui/material';
import React from 'react';

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

interface Props {
  slice: AboutUsInfoProps;
}

const AboutUsBlock: React.FC<Props> = ({ slice }) => {
  return (
    <Box key={slice.id} sx={{ marginBottom: { xs: '7%', md: '161px' } }}>
      {slice.primary.infotitle && slice.primary.infotitle[0] && (
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.875rem' },
            fontWeight: 700,
            lineHeight: 1.3,
            color: '#000',
            marginBottom: { xs: '7%', md: '60px' },
          }}
        >
          {slice.primary.infotitle[0].text}
        </Typography>
      )}

      {slice.items.map((item, index) => (
        <Box key={index} sx={{ marginBottom: { xs: '7%', md: '60px' } }}>
          {item.infodescription && item.infodescription[0] && (
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: '#777',
                fontSize: '1.125rem',
                fontWeight: 500,
                lineHeight: 1.44,
              }}
            >
              {item.infodescriptiontitle && item.infodescriptiontitle[0] && (
                <Typography
                  component="span"
                  variant="body1"
                  sx={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: '#000',
                    padding: 0,
                    lineHeight: 1.1,
                  }}
                >
                  {item.infodescriptiontitle[0].text}{' '}
                </Typography>
              )}
              {index === 0 ? (
                <Typography component="span" variant="body1">
                  {item.infodescription[0].text}
                </Typography>
              ) : (
                <Box component="span" sx={{ display: 'block', marginTop: '10px' }}>
                  <Typography component="span" variant="body1">
                    {item.infodescription[0].text}
                  </Typography>
                </Box>
              )}
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default AboutUsBlock;
