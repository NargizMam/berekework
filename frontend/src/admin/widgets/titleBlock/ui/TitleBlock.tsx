import { Box, Typography } from '@mui/material';
import TitleBlockStyle from './TitleBlock-style';
import './TitleBlock.css';
import { LinkButtonWithArrow } from '../../../../shared/linkButtonWithArrow';
import React from 'react';

export interface TitleBlockApiData {
  primary: {
    buttontext: string;
    buttonlink: string;
    titletext: string;
    titledescription: string;
    titleimage: {
      url: string;
      alt: string;
      dimensions: {
        width: number;
        height: number;
      };
    };
  };
}

interface Props {
  slice: TitleBlockApiData;
}

export const TitleBlock: React.FC<Props> = ({ slice }) => {
  const description = slice.primary.titledescription ? (
    <Typography
      sx={slice.primary.titleimage?.url ? TitleBlockStyle.description : TitleBlockStyle.descriptionWithoutImage}
    >
      {slice.primary.titledescription}
    </Typography>
  ) : null;
  const image = slice.primary.titleimage?.url ? (
    <Box sx={TitleBlockStyle.imageWrapper}>
      <img src={slice.primary.titleimage.url} alt={slice.primary.titleimage.alt} className="TitleBlock__image" />
    </Box>
  ) : null;
  const button = slice.primary.buttontext ? (
    <Box sx={TitleBlockStyle.button}>
      <LinkButtonWithArrow url={slice.primary.buttonlink} text={slice.primary.buttontext} />
    </Box>
  ) : null;

  return (
    <>
      {/*<Box sx={TitleBlockStyle.block}>*/}
      <Box sx={image ? TitleBlockStyle.blockImageOnly : TitleBlockStyle.block}>
        <Box id='our-company' sx={slice.primary.titleimage?.url ? TitleBlockStyle.infoBlock : {}}>
          <Typography
            variant="h1"
            id='to-vacancies'
            sx={slice.primary.titleimage?.url ? TitleBlockStyle.title : TitleBlockStyle.titleWithoutImage}
          >
            {slice.primary.titletext}
          </Typography>
          {description}
        </Box>
        {image}
      </Box>
      {button}
    </>
  );
};
