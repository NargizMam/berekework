import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { archiveUser, getAllUser } from '../../../../feachers/user/usersThunk';
import { selectUsers, selectUsersLoading } from '../../../../feachers/user/usersSlice';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Loader } from '../../../../shared/loader';
import { toast } from 'react-toastify';
import UserCrmTable from '../../../widgets/crmTable/userCrmTable';

export const UserPanelPage = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const [userId, setUserId] = useState<string | null>(null);
  const loading = useAppSelector(selectUsersLoading);

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  const handleDeleteUser = async (id: string) => {
    setUserId(id);
  };

  if (loading) {
    return <Loader />;
  }

  const onDeleteConfirm = async () => {
    if (userId) {
      try {
        await dispatch(archiveUser(userId)).unwrap();
        await dispatch(getAllUser());
        setUserId(null);
        toast.success('Пользователь архивирован!');
      } catch (error) {
        toast.error('Что то пошло не так!');
        setUserId(null);
      }
    }
  };

  const onDeleteCancel = () => {
    setUserId(null);
  };

  return (
    <>
      <UserCrmTable users={users} archiveUser={handleDeleteUser} />
      <Dialog open={Boolean(userId)} onClose={onDeleteCancel}>
        <DialogTitle>Подтвердите удаление</DialogTitle>
        <DialogContent>Вы действительно хотите архивировать этого пользователя?</DialogContent>
        <DialogActions>
          <Button onClick={onDeleteConfirm}>Да</Button>
          <Button onClick={onDeleteCancel}>Нет</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
