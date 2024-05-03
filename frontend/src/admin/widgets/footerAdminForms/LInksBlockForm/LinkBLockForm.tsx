import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { IFooterLinks, ILinks } from '../../../../shared/types';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch } from '../../../../app/store/hooks';
import { createFooterLinks } from '../../../page/FooterAdmin/api/FooterThunk';

interface LinkBlockFormProps {
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

const LinkBLockForm: React.FC<LinkBlockFormProps> = ({open, onClose}) => {
  const [title, setTitle] = useState('');
  const dispatch = useAppDispatch();

  const [linksState, setLinksState] = useState<ILinks[]>(
    [{url: '', text: ''},]
  );

  console.log({
    title,
    linksState,
  });

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);

  const addInputField = () => {
    setLinksState([...linksState, {url: '', text: ''}]);
  };

  const removeFields = (index: number) => {
    const data = [...linksState];
    data.splice(index, 1);
    setLinksState(data);
  };

  const handleUrlChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newData = [...linksState];
    newData[index].url = event.target.value;
    setLinksState(newData);
  };

  const handleTextChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newData = [...linksState];
    newData[index].text = event.target.value;
    setLinksState(newData);
  };

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const obj: IFooterLinks = {
      title: title,
      links: linksState,
    };

    try {
      console.log(obj);
      await dispatch(createFooterLinks(obj));
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
              Создание блока с ссылками
            </Typography>
            <Button onClick={closeModal}>close</Button>
          </Grid>
          <TextField
            label="Заголовок блока с ссылками"
            variant="outlined"
            fullWidth
            value={title}
            onChange={handleTitleChange}
            sx={{mt: 2}}
          />
          {linksState.map((element, index) => (
            <Grid sx={{display: 'flex', alignItems: 'center'}} key={index}>
              <TextField
                label="url"
                variant="outlined"
                fullWidth
                onChange={e => handleUrlChange(index, e)}
                value={element.url}
                sx={{mt: 2, marginRight: '10px'}}
              />
              <TextField
                label="Текст"
                variant="outlined"
                fullWidth
                value={element.text}
                onChange={e => handleTextChange(index, e)}
                sx={{mt: 2, marginLeft: '10px', marginRight: '20px'}}
              />
              {
                index ?
                  <Button type="button"
                          variant="contained"
                          sx={{marginTop: '15px'}}
                          onClick={() => removeFields(index)}
                  ><CloseIcon/></Button>
                  : <div style={{width: '100px', marginLeft: '20px'}}></div>
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

export default LinkBLockForm;

