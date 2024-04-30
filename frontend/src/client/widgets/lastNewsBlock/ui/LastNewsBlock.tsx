import { useEffect, useState } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import LastNewsBlockStyle from './LastNewsBlock-style';
import { PaginationCards } from '../../../../admin/widgets/PaginationCards';
import LastNewsCards from './LastNewsCards/LastNewsCards';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { Loader } from '../../../../shared/loader';
import { getLastNewsBlock } from '../../../../admin/widgets/lastNews/blocks/model/blockThunk';
import { selectBlock, selectBlocksLoading } from '../../../../admin/widgets/lastNews/blocks/model/blockSlice';

const LastNewsBlock = () => {
  const [startIndex, setStartIndex] = useState(0);
  const pageSize = 3;

  const block = useAppSelector(selectBlock);
  const isLoading = useAppSelector(selectBlocksLoading);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    dispatch(getLastNewsBlock());
  }, [dispatch]);

  if (!block) {
    return;
  }


  const cards = block.cards;

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
      <Box sx={LastNewsBlockStyle.block}>
        <Box sx={LastNewsBlockStyle.row}>
          <Typography variant="h2" sx={LastNewsBlockStyle.title}>
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
        <LastNewsCards
          cards={cards}
          startIndex={startIndex}
          pageSize={isTablet ? undefined : pageSize}
          isPaginationEnabled={!isTablet}
        />
      </Box>
    </>
  );
};

export default LastNewsBlock;
