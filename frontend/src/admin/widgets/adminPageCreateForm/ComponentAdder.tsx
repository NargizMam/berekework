import React from 'react';
import { Button, TextField } from '@mui/material';

interface Props {
  name: string;
  url: string;
  buttonStatus: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setOpenModal: (isOpen: boolean) => void;
}

const ComponentAdder: React.FC<Props> = ({ name, url, onInputChange, setOpenModal, buttonStatus }) => {
  return (
    <>
      <TextField label="Название" name={'name'} value={name} onChange={onInputChange} variant="outlined" />
      <TextField label="Ссылка" name={'url'} value={url} onChange={onInputChange} variant="outlined" />
      <Button
        onClick={() => setOpenModal(true)}
        variant="contained"
        disabled={!name || !url || buttonStatus}
        sx={{ backgroundColor: '#000', color: '#fff', borderColor: '#000', width: '50%', alignSelf: 'center' }}
      >
        Добавить компонент
      </Button>
    </>
  );
};

export default ComponentAdder;
