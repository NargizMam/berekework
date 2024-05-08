import { Button, Typography } from '@mui/material';
import { NavLink } from "react-router-dom";
import Container from '@mui/material/Container';

export const AdminAllPages = () => {
  return (
    <Container style={{ position: 'relative' }}>
      <Typography>Страницы еще не созданы</Typography>
      <div style={{ position: 'fixed', top: 'auto', right: 100, zIndex: 999 }}>
        <Button variant="outlined" component={NavLink} to='new-page'>Create Page</Button>
      </div>
    </Container>
  );
};

