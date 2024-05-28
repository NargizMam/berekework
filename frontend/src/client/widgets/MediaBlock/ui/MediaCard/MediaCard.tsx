import React from 'react';
import { Box, Button, CardMedia } from '@mui/material';
import iconPlay from '../../images/icon-play.png';
import MediaCardStyle from './MediaCard-style';

export interface MediaCardApiData {
  image?: {
    url: string;
    alt: string;
  };
  video?: {
    url: string;
    alt: string;
  };
  onClick: (index: number) => void;
  index: number;
}

const MediaCard: React.FC<MediaCardApiData> = ({ image, video, onClick, index }) => {
  const imageUrl = image ? image.url : null;
  const videoUrl = video ? video.url : null;

  const mediaElement = imageUrl ? (
    <Button sx={MediaCardStyle.card} onClick={() => onClick(index)}>
      <CardMedia sx={MediaCardStyle.image} component="img" image={imageUrl} alt={image?.alt || video?.alt || ''} />
      {videoUrl && (
        <Box sx={MediaCardStyle.iconPlayWrapper}>
          <img src={iconPlay} alt="play" />
        </Box>
      )}
    </Button>
  ) : null;

  return <>{mediaElement}</>;
};

export default MediaCard;
