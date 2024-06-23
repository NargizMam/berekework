import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Loader } from '../../../../shared/loader';
import { selectVacancies, selectVacanciesLoading } from '../../../../feachers/vacancy/vacancySlice';
import { getAllVacancy } from '../../../../feachers/vacancy/vacancyThunk';
import { toast } from 'react-toastify';
import VacancyTableCrm from '../../../widgets/crmTable/vacancyTableCrm';
import { archiveModels } from '../../../../feachers/user/usersThunk';

export const VacancyPage = () => {
  const dispatch = useAppDispatch();
  const vacancies = useAppSelector(selectVacancies);
  const [vacancyId, setVacancyId] = useState<string | null>(null);
  const loading = useAppSelector(selectVacanciesLoading);

  useEffect(() => {
    dispatch(getAllVacancy());
  }, [dispatch]);

  const handleDeleteVacancy = async (id: string) => {
    setVacancyId(id);
  };

  if (loading) {
    return <Loader />;
  }

  const onDeleteConfirm = async () => {
    if (vacancyId) {
      try {
        // await dispatch(deleteVacancy(vacancyId));
        await dispatch(
          archiveModels({
            id: vacancyId,
            model: 'vacancy',
          }),
        );
        await dispatch(getAllVacancy());
        toast.success('Вакансия архивирована!');
        setVacancyId(null);
      } catch (error) {
        toast.error('Что то пошло не так!');
        setVacancyId(null);
      }
    }
  };

  const onDeleteCancel = () => {
    setVacancyId(null);
  };

  return (
    <>
      <VacancyTableCrm vacancies={vacancies} archiveVacancyClick={handleDeleteVacancy} />
      <Dialog open={Boolean(vacancyId)} onClose={onDeleteCancel}>
        <DialogTitle>Подтвердите архивирование</DialogTitle>
        <DialogContent>Вы действительно хотите архивировать эту вакансию?</DialogContent>
        <DialogActions>
          <Button onClick={onDeleteConfirm}>Да</Button>
          <Button onClick={onDeleteCancel}>Нет</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
