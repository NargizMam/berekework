import { Box, Typography } from '@mui/material';

import TitleBlockStyle from './TitleBlock-style';
import './TitleBlock.css';
import { LinkButtonWithArrow } from '../../../../shared/linkButtonWithArrow';
import MainCards from '../../mainCards/ui/MainCards';
import React from 'react';

export interface TitleBlockApiData {
  primary: {
    main_title: string
    button_text: string
    button_link: {
      url: string
    }
    description?: string
    image: {
      url: string
      alt: string
      dimensions: {
        width: number
        height: number
      }
    }
  }
}

interface Props {
  slice: TitleBlockApiData;
}

export const StartScreen: React.FC<Props> = ({ slice }) => {
  const image = slice.primary.image.url ? (
    <Box sx={TitleBlockStyle.imageWrapper}>
      <img src={slice.primary.image.url} alt={slice.primary.image.alt} width={slice.primary.image.dimensions.width} height={slice.primary.image.dimensions.height} className="TitleBlock__image" />
    </Box>
  ) : null;
  const button = slice.primary.button_text ? (
    <Box sx={TitleBlockStyle.button}>
      <LinkButtonWithArrow url={slice.primary.button_link.url} text={slice.primary.button_text} />
    </Box>
  ) : null;

  return (
    <>
      <Box sx={TitleBlockStyle.block}>
        <Box sx={slice.primary.image.url ? TitleBlockStyle.infoBlock : {}}>
          <Typography variant="h1" sx={slice.primary.image.url ? TitleBlockStyle.title : TitleBlockStyle.titleWithoutImage}>
            {slice.primary.main_title}
          </Typography>
        </Box>
        {image}
        {image}
      </Box>
      {button}
      <MainCards/>
    </>
  );
};
