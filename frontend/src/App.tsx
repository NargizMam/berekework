import './App.css';
import ChooseSpecialistBlock from './widgets/specialistBlock/ui/ChooseSpecialistBlock.tsx';
import { Grid } from '@mui/material';

const App = () => {
  return (
    <Grid container spacing={2}>
      <ChooseSpecialistBlock/>
    </Grid>
  );
};

export default App;
