import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

interface LinkBlockFormProps {
  open: boolean;
  onClose: () => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const LinkBLockForm: React.FC<LinkBlockFormProps> = ({ open, onClose }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);
  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => setUrl(event.target.value);

  const handleSubmit = () => {
    console.log("Title:", title);
    console.log("URL:", url);
  };

  const closeModal = () => {
    onClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Создание блока с ссылками
            </Typography>
            <Button onClick={closeModal}>close</Button>
          </Grid>
          <TextField
            label="Заголовок ссылки"
            variant="outlined"
            fullWidth
            value={title}
            onChange={handleTitleChange}
            sx={{ mt: 2 }}
          />
          <TextField
            label="URL ссылки"
            variant="outlined"
            fullWidth
            value={url}
            onChange={handleUrlChange}
            sx={{ mt: 2 }}
          />
          <Button onClick={handleSubmit} variant="contained" sx={{ mt: 2 }}>
            Создать блок с ссылками
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default LinkBLockForm;

