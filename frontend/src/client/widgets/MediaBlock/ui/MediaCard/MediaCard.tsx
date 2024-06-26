import React from 'react';
import { Box, CardMedia } from '@mui/material';
import getMediaCardStyle from './getMediaCardStyle';
import iconPlay from '../../images/icon-play.png';

export interface MediaCardApiData {
  index: number;
  image?: {
    url: string;
    alt: string;
  };
  video?: {
    embed_url: string;
    thumbnail_url: string;
    title: string;
    // html: string;
  };
  mediaCardsLength: number;
  onClick: (index: number) => void;
}

const MediaCard: React.FC<MediaCardApiData> = ({ index, image, video, mediaCardsLength, onClick }) => {
  const MediaCardStyle = getMediaCardStyle(mediaCardsLength);

  const imageUrl = image ? image.url : undefined;
  const videoUrl = video ? video.embed_url : undefined;
  const videoThumbnailUrl = video ? video.thumbnail_url : undefined;

  const mediaElement = (
    <Box sx={MediaCardStyle.card} onClick={() => onClick(index)}>
      {imageUrl && (
        <CardMedia sx={MediaCardStyle.image} component="img" image={imageUrl} alt={image?.alt || video?.title || ''} />
      )}
      {videoUrl && videoThumbnailUrl && (
        <>
          <CardMedia sx={MediaCardStyle.image} component="img" image={videoThumbnailUrl} alt={video?.title || ''} />
          <Box sx={MediaCardStyle.iconPlayWrapper}>
            <img src={iconPlay} alt="play" />
          </Box>
        </>
      )}
    </Box>
  );

  // const mediaElement = video?.html ? (
  //   <Box sx={MediaCardStyle.card} onClick={() => onClick(index)}>
  //     <Box sx={MediaCardStyle.videoWrapper} dangerouslySetInnerHTML={{ __html: video.html }} />
  //   </Box>
  // ) : (
  //   <Box sx={MediaCardStyle.card} onClick={() => onClick(index)}>
  //     {image && <CardMedia component="img" image={image.url} alt={image.alt || ''} sx={MediaCardStyle.image} />}
  //   </Box>
  // );
  return <>{mediaElement}</>;
};

export default MediaCard;

