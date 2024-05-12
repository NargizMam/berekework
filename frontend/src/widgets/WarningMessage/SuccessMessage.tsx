import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { openSuccessMessage, selectShowSuccessMessage } from './warningMessageSlice';


interface Props {
  successMessage: string;
}

const SuccessMessage: React.FC<Props> = ({successMessage}) => {
  const dispatch = useAppDispatch();
  const showSuccessMessage = useAppSelector(selectShowSuccessMessage);

  return (
    <div>
      <Snackbar open={showSuccessMessage}
                autoHideDuration={5000}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                onClose={() => dispatch(openSuccessMessage())}
      >
        <Alert
          onClose={() => dispatch(openSuccessMessage())}
          severity="success"
          variant="filled"
          sx={{width: '100%'}}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};
export default SuccessMessage;