import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface Props {
  title: string;
  text: string;
  isOpen: null | string;
  setIsOpen: (item: null | string) => void;
  onDeleteConfirm: () => void;
}

const ModalCrm: React.FC<Props> = ({title, text, isOpen, setIsOpen, onDeleteConfirm}) => {
  const onDeleteCancel = () => {
    setIsOpen(null);
  };

  return (
    <Dialog open={Boolean(isOpen)} onClose={onDeleteCancel}>
      <DialogTitle>Подтвердите {title}</DialogTitle>
      <DialogContent>{text}</DialogContent>
      <DialogActions>
        <Button onClick={onDeleteConfirm}>Да</Button>
        <Button onClick={onDeleteCancel}>Нет</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalCrm;