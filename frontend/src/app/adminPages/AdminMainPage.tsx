import {Paper, Typography} from '@mui/material';
import Page from "./dashboard/page";

const AdminMainPage = () => {
  return (
    <>
        <Paper style={{ padding: '20px', margin: '20px', flex: 1 }}>
          <Typography sx={{margin: 2}} variant="h5">Общая статистическая информация</Typography>
            <Page/>
        </Paper>
    </>

  );
};

export default AdminMainPage;