import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { getAllModerators } from '../api/moderatorsThunk';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { Loader } from '../../../../shared/loader';
import { selectModerators, selectModeratorsLoading } from '../model/moderatorsSlice';
import { ModeratorsForm } from './moderatorsForm';
import ModeratorTableCrm from '../../../widgets/crmTable/moderatorTableCrm';
import { archiveModels } from '../../../../feachers/user/usersThunk';
import { toast } from 'react-toastify';

export const ModeratorsPage = () => {
  const dispatch = useAppDispatch();
  const moderators = useAppSelector(selectModerators);
  const loading = useAppSelector(selectModeratorsLoading);
  const [openForm, setOpenForm] = useState(false);
  const [moderatorId, setModeratorId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getAllModerators());
  }, [dispatch]);

  const onDeleteModerator = async (id: string) => {
    setModeratorId(id);
  };

  const onDeleteConfirm = async () => {
    if (moderatorId) {
      try {
        await dispatch(
          archiveModels({
            id: moderatorId,
            model: 'moderator',
          }),
        );
        dispatch(getAllModerators());
        toast.success('Модератор архивирована!');
        setModeratorId(null);
      } catch (error) {
        toast.error('Что то пошло не так!');
        setModeratorId(null);
      }
    }
  };

  const onDeleteCancel = () => {
    setModeratorId(null);
  };

  return (
    <Box>
      {loading && <Loader />}
      <Button variant="outlined" onClick={() => setOpenForm(true)} sx={{mb: 3}}>
        Создать модератора
      </Button>
      {moderators.length === 0 ? (
        <Typography sx={{ fontWeight: 'bold' }} variant={'h4'}>Модераторы еще не созданы</Typography>
      ) : (
        <ModeratorTableCrm moderators={moderators} onArchiveModerator={onDeleteModerator} />
      )}
      {openForm && <ModeratorsForm close={() => setOpenForm(false)} />}
      <Dialog open={Boolean(moderatorId)} onClose={onDeleteCancel}>
        <DialogTitle>Подтвердите архивирование</DialogTitle>
        <DialogContent>Вы действительно хотите архивировать этого админа?</DialogContent>
        <DialogActions>
          <Button onClick={onDeleteConfirm}>Да</Button>
          <Button onClick={onDeleteCancel}>Нет</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
