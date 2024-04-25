import { Button, Typography } from '@mui/material';
import { NavLink } from "react-router-dom";

export const AdminAllPages = () => {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Typography>Страницы еще не созданы</Typography>
      <div style={{ position: 'fixed', top: 'auto', right: 20, zIndex: 999 }}>
        <Button variant="outlined" component={NavLink} to='new-page'>Create Page</Button>
      </div>
    </div>
  );
};

