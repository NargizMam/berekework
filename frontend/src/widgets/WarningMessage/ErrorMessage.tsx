import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { openErrorMessage, selectShowErrorMessage } from './warningMessageSlice';

interface Props {
  errorMessage: string;
}

const ErrorMessage: React.FC<Props> = ({ errorMessage }) => {
  const dispatch = useAppDispatch();
  const showErrorMessage = useAppSelector(selectShowErrorMessage);
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={showErrorMessage}
        autoHideDuration={5000}
        onClose={() => dispatch(openErrorMessage())}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{errorMessage}</span>}
        action={[
          <IconButton key="close" aria-label="Close" color="warning" onClick={() => dispatch(openErrorMessage())}>
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </div>
  );
};

export default ErrorMessage;
