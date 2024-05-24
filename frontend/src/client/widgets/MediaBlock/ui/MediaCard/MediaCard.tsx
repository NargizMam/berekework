import React, { useState } from 'react';
import { Box, CardMedia, Modal } from '@mui/material';
import ReactPlayer from 'react-player';
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
    if (url) {
      setModalContent({ type, url });
      setOpen(true);
    }
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
          <CardMedia
            sx={MediaCardStyle.image}
            component="img"
            image={modalContent.url}
            alt={modalContent?.type === 'image' ? image?.alt : ''}
          />
        ) : (
          <ReactPlayer url={modalContent?.url} controls width="100%" height="100%" />
        )}
      </Box>
    </Modal>
  );

  const mediaElement = imageUrl ? (
    <Box sx={MediaCardStyle.card} onClick={() => handleOpen(videoUrl ? 'video' : 'image', videoUrl || imageUrl)}>
      <CardMedia sx={MediaCardStyle.image} component="img" image={imageUrl} alt={image?.alt || video?.alt || ''} />
      {videoUrl && (
        <Box sx={MediaCardStyle.iconPlayWrapper}>
          <img src={iconPlay} alt="play" />
        </Box>
      )}
    </Box>
  ) : null;

  return (
    <>
      {mediaElement}
      {modal}
    </>
  );
};

export default MediaCard;
