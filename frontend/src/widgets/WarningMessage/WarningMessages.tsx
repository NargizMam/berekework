import { Grid } from '@mui/material';
import { useAppSelector } from '../../app/store/hooks';
import SuccessMessage from './SuccessMessage';
import ErrorMessage from './ErrorMessage';
import {
  selectModeratorsCreateError,
  selectModeratorsSuccessMessage,
} from '../../admin/page/moderatorsPanel/model/moderatorsSlice';

const WarningMessage = () => {
  const successMessage = useAppSelector(selectModeratorsSuccessMessage);
  const errorMessage = useAppSelector(selectModeratorsCreateError);

  return (
    <>
      <Grid container direction="column" spacing={2}>
        <Grid item xs={12}>
          {successMessage && <SuccessMessage successMessage={successMessage} />}
        </Grid>
        <Grid item xs={12}>
          {errorMessage && <ErrorMessage errorMessage={errorMessage.error} />}
        </Grid>
      </Grid>
    </>
  );
};

export default WarningMessage;
