import MediaCard, { MediaCardApiData } from './MediaCard/MediaCard';
import React from 'react';
import { Box, Typography } from '@mui/material';

export interface MediaBlockApiData {
  primary: {
    title: string;
  };
  items: MediaCardApiData[];
}

interface Props {
  slice: MediaBlockApiData;
}

const MediaBlock: React.FC<Props> = ({ slice }) => {
  return (
    <Box sx={{ marginBottom: '50px' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        {slice.primary.title}
      </Typography>
      <Box>
        {slice.items.map((item, index) => (
          <MediaCard key={index} image={item.image} video={item.video} />
        ))}
      </Box>
    </Box>
  );
};

export default MediaBlock;
