import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { selectFooter } from '../../../page/FooterAdmin/model/FooterSlice';
import { createCopyright, fetchFooterData } from '../../../page/FooterAdmin/api/FooterThunk';
import CloseIcon from '@mui/icons-material/Close';

interface CopyrightFormProps {
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

const CopyrightForm: React.FC<CopyrightFormProps> = ({ open, onClose }) => {
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();
  const footer = useAppSelector(selectFooter);

  useEffect(() => {
    dispatch(fetchFooterData());
  }, [dispatch]);

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const footerCopyrightBlock = footer[0]?.copyright;

    if (footerCopyrightBlock) {
      alert('Копирайт уже существует. \nДля того чтобы создать новый, удалите предыдущий.');
      return;
    }

    try {
      await dispatch(createCopyright(text));
      alert('Вы успешно создали копирайт!');
      onClose();
    } catch (e) {
      alert('Ошибка при создании контактного блока');
    }
  };

  const closeModal = () => {
    onClose();
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
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
              Создание копирайта
            </Typography>
            <Button onClick={closeModal}><CloseIcon /></Button>
          </Grid>
          <TextField
            label="Текст копирайта"
            variant="outlined"
            fullWidth
            value={text}
            onChange={handleTextChange}
            sx={{ mt: 2 }}
          />
          <Grid
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
            <Button type="submit" onClick={submitFormHandler} variant="contained" sx={{ mt: 2 }}>
              Создать копирайт
            </Button>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default CopyrightForm;
