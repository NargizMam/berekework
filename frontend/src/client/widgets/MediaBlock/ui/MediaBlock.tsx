import React, { useState } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import MediaCard, { MediaCardApiData } from './MediaCard/MediaCard';
import { PaginationCards } from '../../../../admin/widgets/PaginationCards';
import MediaBlockStyle from './MediaBlock-style';

export interface MediaBlockApiData {
  primary: {
    title: Array<{
      type: string;
      text: string;
    }>;
  };
  items: MediaCardApiData[];
}

interface Props {
  slice: MediaBlockApiData;
  style?: React.CSSProperties;
}

const MediaBlock: React.FC<Props> = ({ slice, style }) => {
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
    <Box sx={{ ...MediaBlockStyle.container, ...style }}>
      <Box sx={MediaBlockStyle.row}>
        {slice.primary.title.map((title, index) => (
          <Typography key={index} variant="h4" sx={MediaBlockStyle.title}>
            {title.text}
          </Typography>
        ))}
        {!isTablet && isPaginationEnabled && (
          <PaginationCards
            onBack={handleBack}
            onForward={handleForward}
            isBackDisabled={isBackDisabled}
            isForwardDisabled={isForwardDisabled}
          />
        )}
      </Box>
      <Box sx={MediaBlockStyle.cards}>
        {cardsToDisplay.length > 0 ? (
          cardsToDisplay.map((item, index) => <MediaCard key={index} image={item.image} video={item.video} />)
        ) : (
          <Typography variant="h6" sx={MediaBlockStyle.paragraph}>
            Медиафайлы отсутствуют
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default MediaBlock;
