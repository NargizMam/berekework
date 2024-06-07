import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { selectEmployer } from '../../page/Auth/model/AuthSlice';
import { getSingleUser } from '../../../feachers/user/usersThunk';
import { selectProfile, selectUsersLoading } from '../../../feachers/user/usersSlice';
import { API_URL } from '../../../app/constants/links';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { Loader } from '../../../shared/loader';
import './Employee.css';
import './MediaEmployee.css';
import { Box } from '@mui/material';
import SelectVacancyDialog from './selectVacancyDialog';

const EmployeeProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectProfile);
  const employer = useAppSelector(selectEmployer);
  const isLoading = useAppSelector(selectUsersLoading);

  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getSingleUser(id));
    }
  }, [dispatch, id]);

  // const handleAction = async (action: number) => {
  //   if(action === 1) {
  //     /// на рассмотрении
  //   } else if (action === 2) {
  //     /// связаться
  //   } else {
  //     /// отклонить
  //   }
  // }

  if (isLoading) {
    return <Loader />;
  }

  if (!user) {
    return <div>Пользователь не найден</div>;
  }

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const image = user.avatar ? API_URL + user.avatar : '/path/to/default-avatar.jpg';

  return (
    <div className="UserProfile__container">
      <h2 className="UserProfile__title">
        Сотрудник: {user.name} {user.surname}
      </h2>
      {image && <img className="employee-img" src={image} alt={`${user.name} ${user.surname}`} />}
      <p>
        <span>Дата рождения:</span> {user.dateOfBirth}
      </p>
      <p>
        <span>Страна:</span> {user.country}
      </p>
      <p>
        <span>Город:</span> {user.city}
      </p>
      <p>
        <span>Образование:</span> {user.education}
      </p>
      {user.workExperience.map((work) => (
        <p>
          <span>Опыт работы:</span> {`${work.fieldOfWork} - ${work.duration}`}
        </p>
      ))}
      <p>
        <span>О себе:</span> {user.aboutMe}
      </p>
      <SelectVacancyDialog open={openDialog} onClose={handleCloseDialog} userId={user._id} />
      {employer ? (
        <Box
          sx={{
            display: 'flex',
            gap: '0 15px',
          }}
        >
          <button className="employee-btn" onClick={handleOpenDialog}>
            На рассмотрение
          </button>
          <SelectVacancyDialog open={openDialog} onClose={handleCloseDialog} userId={user._id} />
        </Box>
      ) : null}
    </div>
  );
};

export default EmployeeProfile;
