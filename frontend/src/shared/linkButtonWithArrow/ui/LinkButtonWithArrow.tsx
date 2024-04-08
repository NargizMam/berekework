import { Link, Box, Typography } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Arrow from '../../assets/Arrow-Right.png';
import LinkButtonWithArrowStyle from './LinkButtonWithArrow-style';
import './LinkButtonWithArrow.css';

interface Props {
  url: string;
  text: string;
}

export const LinkButtonWithArrow: React.FC<Props> = ({ url, text }) => {
  return (
    <>
      <Link component={RouterLink} to={url} sx={LinkButtonWithArrowStyle.text}>
        <Box sx={LinkButtonWithArrowStyle.style}>
          <Typography>{text}</Typography>
          <img src={Arrow} alt={text} className="LinkButtonWithArrow__arrow" />
        </Box>
      </Link>
    </>
  );
};