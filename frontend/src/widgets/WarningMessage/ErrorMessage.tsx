import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { closeErrorMessage, selectErrorMessage, selectShowErrorMessage } from './warningMessageSlice';

const ErrorMessage = () => {
  const dispatch = useAppDispatch();
  const showErrorMessage = useAppSelector(selectShowErrorMessage);
  const errorMessage = useAppSelector(selectErrorMessage);

  const handleClose = () => {
    dispatch(closeErrorMessage());
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={showErrorMessage}
      autoHideDuration={2000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity="error"
        sx={{ width: '100%', backgroundColor: 'red', color: 'white',  fontSize: '1.2em'  }}
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
        {errorMessage}
      </Alert>
    </Snackbar>
  );
};

export default ErrorMessage;
