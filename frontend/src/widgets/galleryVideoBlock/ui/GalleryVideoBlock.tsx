import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { Loader } from '../../../shared/loader';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { PaginationCards } from '../../../shared/PaginationCards';
import GalleryVideoCards from './galeryVideoCards/GalleryVideoCards';
import { selectGalleryVideoBlock, selectGalleryVideoBlockLoading } from '../model/galleryVideoBlockSlice';
import { getGalleryVideoBlock } from '../model/galleryVideoBlockThunks';
import GalleryVideoBlockStyle from './GalleryVideoBlock-style';

const GalleryVideoBlock = () => {
  const [startIndex, setStartIndex] = useState(0);
  const pageSize = 3;

  const block = useAppSelector(selectGalleryVideoBlock);
  const isLoading = useAppSelector(selectGalleryVideoBlockLoading);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    dispatch(getGalleryVideoBlock());
  }, [dispatch]);

  if (!block) {
    return null;
  }

  const cards = block.cards;

  if (!cards) {
    return (
      <Typography variant="h2" sx={GalleryVideoBlockStyle.title}>
        Нет доступных видео/фото
      </Typography>
    );
  }

  const isBackDisabled = startIndex === 0;
  const isForwardDisabled = startIndex + pageSize >= cards.length;

  const handleBack = () => {
    setStartIndex(Math.max(0, startIndex - pageSize));
  };

  const handleForward = () => {
    setStartIndex(startIndex + pageSize);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Box sx={GalleryVideoBlockStyle.block}>
        <Box sx={GalleryVideoBlockStyle.row}>
          <Typography variant="h2" sx={GalleryVideoBlockStyle.title}>
            {block.title}
          </Typography>
          {!isTablet && (
            <PaginationCards
              onBack={handleBack}
              onForward={handleForward}
              isBackDisabled={isBackDisabled}
              isForwardDisabled={isForwardDisabled}
            />
          )}
        </Box>
        <GalleryVideoCards
          cards={cards}
          startIndex={startIndex}
          pageSize={isTablet ? undefined : pageSize}
          isPaginationEnabled={!isTablet}
        />
      </Box>
    </>
  );
};

export default GalleryVideoBlock;
