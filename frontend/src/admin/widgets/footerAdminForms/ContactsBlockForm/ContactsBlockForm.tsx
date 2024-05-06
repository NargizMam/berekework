import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { selectFooter } from '../../../page/FooterAdmin/model/FooterSlice';
import { createContactsBLock, fetchFooterData } from '../../../page/FooterAdmin/api/FooterThunk';
import { IContactsBlock } from '../../../../shared/types';
import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ContactsBlockFormProps {
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

const ContactsBlockForm: React.FC<ContactsBlockFormProps> = ({open, onClose}) => {
  const [title, setTitle] = useState('');
  const dispatch = useAppDispatch();
  const footer = useAppSelector(selectFooter);

  console.log(footer);

  useEffect(() => {
    dispatch(fetchFooterData());
  }, [dispatch]);

  const [textState, setTextState] = useState([{ text: '' }]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);

  const addInputField = () => {
    setTextState([...textState, { text: ''}]);
  };

  const removeFields = (index: number) => {
    const data = [...textState];
    data.splice(index, 1);
    setTextState(data);
  };

  const handleTextChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newData = [...textState];
    newData[index].text = event.target.value;
    setTextState(newData);
  };

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const footerContactsBlock = footer[0]?.contactDetails;

    if (!footerContactsBlock || !Array.isArray(footerContactsBlock)) {
      console.error('Invalid footerLinks data:', footerContactsBlock);
      return;
    }

    const existingFooterLinksCount = footerContactsBlock.length;

    if (existingFooterLinksCount >= 1) {
      alert('Возможно создать только один контактный блок.\n' +
        'Прежде чем добавить новый, удалите предыдущий');
      return;
    }

    const obj: IContactsBlock = {
      title: title,
      contactsDetailsArr: textState,
    };

    try {
      await dispatch(createContactsBLock(obj));
      alert('ВЫ успешно создали блок c вашими контактами!');
      onClose();
    } catch (e) {
      alert('Invalid field');
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
          <Grid sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Создание блока контактов
            </Typography>
            <Button onClick={closeModal}><CloseIcon /></Button>
          </Grid>
          <TextField
            label="Заголовок блока контактов"
            variant="outlined"
            fullWidth
            value={title}
            onChange={handleTitleChange}
            sx={{mt: 2}}
          />
          {textState.map((element, index) => (
            <Grid sx={{display: 'flex', alignItems: 'center'}} key={index}>
              <TextField
                label="Текст"
                variant="outlined"
                fullWidth
                value={element.text}
                onChange={e => handleTextChange(index, e)}
                sx={{mt: 2}}
              />
              {
                index ?
                  <Button type="button"
                          variant="contained"
                          sx={{marginTop: '15px', marginLeft: "20px"}}
                          onClick={() => removeFields(index)}
                  ><CloseIcon/></Button>
                  : <div></div>
              }
            </Grid>
          ))}
          <Grid
            sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
            <Button
              variant="contained"
              className="btn btn-outline-success"
              onClick={addInputField}
              sx={{marginTop: '20px'}}
            >+ Add Link</Button>
            <Button type="submit" onClick={submitFormHandler} variant="contained" sx={{mt: 2}}>
              Создать блок с ссылками
            </Button>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default ContactsBlockForm;