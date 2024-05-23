import React, { useState } from 'react';
import { Box, Modal, Typography } from '@mui/material';

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
  const [modalContent, setModalContent] = useState<{ type: 'image' | 'video'; url: string } | null>(null);

  const handleOpen = (content: { type: 'image' | 'video'; url: string }) => {
    setModalContent(content);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setModalContent(null);
  };

  const imageUrl = image ? image.url : null;
  const videoUrl = video ? video.url : null;

  const imageElement = imageUrl ? <img className="MediaCard__image" src={imageUrl} alt={image?.alt} /> : null;

  const videoElement = videoUrl ? (
    <div
      onClick={() => handleOpen({ type: 'video', url: videoUrl })}
      style={{ cursor: 'pointer', position: 'relative' }}
    >
      <img className="MediaCard__video" src={videoUrl} alt={video?.alt} />
      <Typography
        variant="h6"
        component="span"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          borderRadius: '50%',
          padding: '10px',
        }}
      >
        ▶️
      </Typography>
    </div>
  ) : null;

  return (
    <div>
      {imageElement}
      {videoElement}
      <Modal open={open} onClose={handleClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ width: '80%', bgcolor: 'background.paper', boxShadow: 24, p: 4, position: 'relative' }}>
          {modalContent?.type === 'image' ? (
            <img src={modalContent.url} alt={image?.alt} style={{ width: '100%' }} />
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
    </div>
  );
};

export default MediaCard;
