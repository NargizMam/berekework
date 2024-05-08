import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../app/store/hooks';
import { createLogo, fetchFooterData } from '../../../page/FooterAdmin/api/FooterThunk';
import { Box, Button, Grid, Modal, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FileInput from '../../../../shared/fileInput/FileInput';

interface LogoFormProps {
  open: boolean;
  onClose: () => void;
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const LogoAdminForm: React.FC<LogoFormProps> = ({ open, onClose }) => {
  const [image, setImage] = useState<File | null>(null);
  const dispatch = useAppDispatch();

  const filesInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files) {
      setImage(files[0]);
    }
  };


  useEffect(() => {
    dispatch(fetchFooterData());
  }, [dispatch]);

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      alert('Please select an image.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', image);
      await dispatch(createLogo(formData)).unwrap();
      onClose();
    } catch (error) {
      console.error('Error creating logo:', error);
      alert('Failed to create logo. Please try again.');
    }
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
          <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Добавление логотипа
            </Typography>
            <Button onClick={closeModal}>
              <CloseIcon />
            </Button>
          </Grid>
          <Grid mt={3} item xs>
            <FileInput onChange={filesInputChangeHandler} name="logo" label="Логотип" />
          </Grid>
          <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
            <Button type="submit" onClick={submitFormHandler} variant="contained" sx={{ mt: 2 }}>
              Добавить логотип
            </Button>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default LogoAdminForm;
