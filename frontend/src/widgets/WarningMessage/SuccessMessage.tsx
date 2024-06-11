import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import {
  closeSuccessMessage,
  selectShowSuccessMessage,
  selectSuccessMessage
} from './warningMessageSlice';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const SuccessMessage = () => {
  const dispatch = useAppDispatch();
  const showSuccessMessage = useAppSelector(selectShowSuccessMessage);
  const successMessage = useAppSelector(selectSuccessMessage);

  const handleClose = () => {
    dispatch(closeSuccessMessage());
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={showSuccessMessage}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity="success"
        sx={{ width: '100%', backgroundColor: 'green', color: 'white', fontSize: '1.2em' }}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={handleClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {successMessage}
      </Alert>
    </Snackbar>
  );
};

export default SuccessMessage;
