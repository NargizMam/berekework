import React from 'react';
import { Box, Card, Grid } from '@mui/material';
import TitleBlockStyle from '../../../titleBlock/ui/TitleBlock-style';

export interface Props {
  id?: string;
  image?: string;
  video?: string;
}

const GalleryVideoCardItem: React.FC<Props> = ({ image, video }) => {
  const media = image ? (
    <Box sx={TitleBlockStyle.imageWrapper}>
      <img src={image} alt="image" className="TitleBlock__image" />
    </Box>
  ) : video ? (
    <video controls>
      <source src={video} type="video/mp4" />
      Ваш браузер не поддерживает видео в формате mp4.
    </video>
  ) : null;

  return (
    <Grid item xs={12} sm={4} md={4}>
      <Card sx={{ maxWidth: 420 }}>{media}</Card>
    </Grid>
  );
};

export default GalleryVideoCardItem;
