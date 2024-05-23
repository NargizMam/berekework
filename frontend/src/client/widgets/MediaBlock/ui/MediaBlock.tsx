import MediaCard, { MediaCardApiData } from './MediaCard/MediaCard';
import React, { useState } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { PaginationCards } from '../../../../admin/widgets/PaginationCards';

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
  const [startIndex, setStartIndex] = useState(0);
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const pageSize = 3;

  let cardsToDisplay = slice.items;

  const isPaginationEnabled = !isTablet && slice.items.length > pageSize;
  if (isPaginationEnabled) {
    cardsToDisplay = slice.items.slice(startIndex, startIndex + pageSize);
  }

  const isBackDisabled = startIndex === 0;
  const isForwardDisabled = startIndex + pageSize >= slice.items.length;

  const handleBack = () => {
    setStartIndex(Math.max(0, startIndex - pageSize));
  };

  const handleForward = () => {
    setStartIndex(Math.min(startIndex + pageSize, slice.items.length - pageSize));
  };

  return (
    <Box sx={{ marginBottom: '50px' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        {slice.primary.title}
      </Typography>
      {!isTablet && isPaginationEnabled && (
        <PaginationCards
          onBack={handleBack}
          onForward={handleForward}
          isBackDisabled={isBackDisabled}
          isForwardDisabled={isForwardDisabled}
        />
      )}
      <Box>
        {cardsToDisplay.map((item, index) => (
          <MediaCard key={index} image={item.image} video={item.video} />
        ))}
      </Box>
    </Box>
  );
};

export default MediaBlock;
