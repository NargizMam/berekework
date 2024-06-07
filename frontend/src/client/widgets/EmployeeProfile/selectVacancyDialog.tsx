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
import { selectEmployer } from '../../page/Auth/model/AuthSlice';
// import { enqueueSnackbar } from 'notistack';
import { useSnackbar } from 'notistack';

export interface SelectVacancyDialogProps {
  open: boolean;
  onClose: (vacancyId?: string) => void;
  userId: string;
}

const SelectVacancyDialog: React.FC<SelectVacancyDialogProps> = ({ open, onClose, userId }) => {
  const [value, setValue] = useState<string>('');
  const radioGroupRef = useRef<HTMLElement>(null);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const options = useAppSelector(selectVacancies);
  const currentEmployer = useAppSelector(selectEmployer);
  const filteredOptions = currentEmployer
    ? options.filter((option) => option.employer._id === currentEmployer._id)
    : [];
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
      enqueueSnackbar('Отклик успешно отправлен кандидату', { variant: 'success' });
      onClose(value);
    } catch (error: any) {
      enqueueSnackbar(error.error || 'Произошла ошибка при отправке заявки', { variant: 'error' });
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
          {filteredOptions.map((option) => (
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
