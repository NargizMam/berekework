import React from 'react';
import { Box, CardMedia } from '@mui/material';
import iconPlay from '../../images/icon-play.png';
import getMediaCardStyle from './getMediaCardStyle';

export interface MediaCardApiData {
  index: number;
  image?: {
    url: string;
    alt: string;
  };
  video?: {
    url: string;
    alt: string;
  };
  mediaCardsLength: number;
  onClick: (index: number) => void;
}

const MediaCard: React.FC<MediaCardApiData> = ({ index, image, video, mediaCardsLength, onClick }) => {
  const MediaCardStyle = getMediaCardStyle(mediaCardsLength);

  const imageUrl = image ? image.url : null;
  const videoUrl = video ? video.url : null;

  const mediaElement = imageUrl ? (
    <Box sx={MediaCardStyle.card} onClick={() => onClick(index)}>
      {imageUrl && (
        <CardMedia sx={MediaCardStyle.image} component="img" image={imageUrl} alt={image?.alt || video?.alt || ''} />
      )}
      {videoUrl && (
        <Box sx={MediaCardStyle.iconPlayWrapper}>
          <img src={iconPlay} alt="play" />
        </Box>
      )}
    </Box>
  ) : null;

  return <>{mediaElement}</>;
};

export default MediaCard;
