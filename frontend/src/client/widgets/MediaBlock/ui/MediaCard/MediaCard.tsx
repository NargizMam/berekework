import React from 'react';
import { Box, CardMedia } from '@mui/material';
import getMediaCardStyle from './getMediaCardStyle';

export interface MediaCardApiData {
  index: number;
  image?: {
    url: string;
    alt: string;
  };
  video?: {
    html: string;
  };
  mediaCardsLength: number;
  onClick?: (index: number) => void;
}

const MediaCard: React.FC<MediaCardApiData> = ({ index, image, video, mediaCardsLength, onClick }) => {
  const MediaCardStyle = getMediaCardStyle(mediaCardsLength);

  const imageUrl = image ? image.url : undefined;
  const videoHtml = video ? video.html : undefined;

  const mediaElement = (
    <Box sx={MediaCardStyle.card} onClick={onClick ? () => onClick(index) : undefined}>
      {imageUrl && (
        <CardMedia sx={MediaCardStyle.image} component='img' image={imageUrl} alt={image?.alt} />
      )}
      {videoHtml && (
          <Box sx={MediaCardStyle.videoWrapper} dangerouslySetInnerHTML={{ __html: videoHtml }} />
        )}
    </Box>
  );

  return <>{mediaElement}</>;
};

export default MediaCard;
