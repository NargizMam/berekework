import { Box, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import React from 'react';

interface Props {
  onBack: () => void;
  onForward: () => void;
  isBackDisabled: boolean;
  isForwardDisabled: boolean;
}

export const PaginationCards: React.FC<Props> = ({ onBack, onForward, isBackDisabled, isForwardDisabled }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <IconButton onClick={onBack} disabled={isBackDisabled}>
        <ArrowBackIos />
      </IconButton>
      <IconButton onClick={onForward} disabled={isForwardDisabled}>
        <ArrowForwardIos />
      </IconButton>
    </Box>
  );
};


