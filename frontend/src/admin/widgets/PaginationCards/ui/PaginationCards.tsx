import { Box, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import React from 'react';

interface Props {
  onBack: () => void;
  onForward: () => void;
  isBackDisabled: boolean;
  isForwardDisabled: boolean;
}

const paginationButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  backgroundColor: '#D2D2D2',
  width: '50px',
  height: '50px',
  '&:disabled': {
    backgroundColor: '#E0E0E0',
  },
};

const arrowIconStyle = {
  fontSize: '20px',
};

export const PaginationCards: React.FC<Props> = ({ onBack, onForward, isBackDisabled, isForwardDisabled }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
      <IconButton sx={paginationButtonStyle} onClick={onBack} disabled={isBackDisabled}>
        <ArrowBackIos sx={arrowIconStyle} />
      </IconButton>
      <IconButton sx={paginationButtonStyle} onClick={onForward} disabled={isForwardDisabled}>
        <ArrowForwardIos sx={arrowIconStyle} />
      </IconButton>
    </Box>
  );
};
