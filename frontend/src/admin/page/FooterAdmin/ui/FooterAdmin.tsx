import { Box, Button, Grid, Modal, Typography } from '@mui/material';
import LinkBLockForm from '../../../widgets/footerAdminForms/LInksBlockForm/LinkBLockForm';
import '../css/footer.css';
import React, { useState } from 'react';

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

const FooterAdmin: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [openLinks, setOpenLinks] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const openLinksFunc = () => setOpenLinks(true);

  return (
    <>
      <div>
        <h1>#Footer Admin</h1>
        <Button onClick={handleOpen} variant="contained">Создайте свой футер</Button>
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Выберите компонент который хотите создать:
            </Typography>
            <Grid container>
              <Button
                sx={{margin: '20px 0'}}
                className="footer-btn"
                onClick={openLinksFunc}
                variant="contained">
                Создать блок с ссылками
              </Button>
              <Button
                sx={{margin: '20px 0'}}
                className="footer-btn"
                variant="contained">
                Добавить логотип
              </Button>
              <Button
                sx={{margin: '20px 0'}}
                className="footer-btn"
                variant="contained">
                Добавить блок с соц. сетями
              </Button>
              <Button
                sx={{margin: '20px 0'}}
                className="footer-btn"
                variant="contained">
                Добавить свои контактные данные
              </Button>
              <Button
                sx={{margin: '20px 0'}}
                className="footer-btn"
                variant="contained">
                Добавить свой копирайт
              </Button>
            </Grid>
          </Box>
        </Modal>
      </div>
      {openLinks && <LinkBLockForm onClose={() => setOpenLinks(false)} open={openLinks}/>}
    </>
  );
};

export default FooterAdmin;
