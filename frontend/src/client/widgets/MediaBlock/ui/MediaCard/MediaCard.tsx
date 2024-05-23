import React, { useState } from 'react';
import { Box, CardMedia, Modal } from '@mui/material';
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
}

const MediaCard: React.FC<MediaCardApiData> = ({ image, video }) => {
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{
    type: 'image' | 'video';
    url: string;
  } | null>(null);

  const handleOpen = (type: 'image' | 'video', url: string) => {
    setModalContent({ type, url });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setModalContent(null);
  };

  const imageUrl = image ? image.url : null;
  const videoUrl = video ? video.url : null;

  const modal = (
    <Modal open={open} onClose={handleClose}>
      <Box sx={MediaCardStyle.modal}>
        {modalContent?.type === 'image' ? (
          <CardMedia sx={MediaCardStyle.image} component="img" image={modalContent.url} alt={image?.alt} />
        ) : (
          <iframe
            width="100%"
            height="500"
            src={modalContent?.url}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={video?.alt}
          ></iframe>
        )}
      </Box>
    </Modal>
  );

  const imageElement = imageUrl ? (
    <Box sx={MediaCardStyle.card} onClick={() => handleOpen('image', imageUrl)}>
      <CardMedia sx={MediaCardStyle.image} component="img" image={imageUrl} alt={image?.alt} />
    </Box>
  ) : null;

  const videoElement = videoUrl ? (
    <Box sx={MediaCardStyle.card} onClick={() => handleOpen('video', videoUrl)}>
      <CardMedia component="img" image={videoUrl} alt={video?.alt} />
      <Box sx={MediaCardStyle.iconPlayWrapper}>
        <img src={iconPlay} alt="play" />
      </Box>
    </Box>
  ) : null;

  return (
    <>
      {imageElement}
      {videoElement}
      {modal}
    </>
  );
};

export default MediaCard;
