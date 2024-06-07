import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { sendReplyByUser } from '../../../feachers/aplication/aplicationThunk';
import { selectVacancies, selectVacanciesLoading } from '../../../feachers/vacancy/vacancySlice';
import { getAllVacancy } from '../../../feachers/vacancy/vacancyThunk';
import { selectRepliesLoading } from '../../../feachers/aplication/applicationSlice';
import { Loader } from '../../../shared/loader';
import { openErrorMessage } from '../../../widgets/WarningMessage/warningMessageSlice';

export interface SelectVacancyDialogProps {
  open: boolean;
  onClose: (vacancyId?: string) => void;
  userId: string;
}

const SelectVacancyDialog: React.FC<SelectVacancyDialogProps> = ({ open, onClose, userId }) => {
  const [value, setValue] = useState<string>('');
  const radioGroupRef = useRef<HTMLElement>(null);
  const dispatch = useAppDispatch();
  const options = useAppSelector(selectVacancies);
  const isVacanciesLoading = useAppSelector(selectVacanciesLoading);
  const isRepliesLoading = useAppSelector(selectRepliesLoading);

  useEffect(() => {
    dispatch(getAllVacancy());
  }, [dispatch]);

  useEffect(() => {
    if (open && options.length > 0) {
      setValue(options[0]._id);
    }
  }, [open, options]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = async () => {
    try {
      await dispatch(sendReplyByUser({ vacancyId: value, userId })).unwrap();
      onClose(value);
    } catch (error: any) {
      dispatch(openErrorMessage(error.message || 'Произошла ошибка при отправке заявки.'));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  if (isVacanciesLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Loader />
      </div>
    );
  }

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
    >
      <DialogTitle>Выберите вакансию</DialogTitle>
      <DialogContent dividers>
        <RadioGroup ref={radioGroupRef} aria-label="vacancy" name="vacancy" value={value} onChange={handleChange}>
          {options.map((option) => (
            <FormControlLabel value={option._id} key={option._id} control={<Radio />} label={option.vacancyTitle} />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Отмена
        </Button>
        <Button onClick={handleOk} disabled={isRepliesLoading}>
          Отправить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SelectVacancyDialog;
