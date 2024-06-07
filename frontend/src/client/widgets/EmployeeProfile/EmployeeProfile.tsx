import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllUser } from '../../../feachers/user/usersThunk';
import { selectUsers, selectUsersLoading } from '../../../feachers/user/usersSlice';
import { API_URL } from '../../../app/constants/links';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { Loader } from '../../../shared/loader';
import './Employee.css';
import './MediaEmployee.css';
import SelectVacancyDialog from './selectVacancyDialog';

const EmployeeProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const isLoading = useAppSelector(selectUsersLoading);

  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(getAllUser());
    }
  }, [dispatch, users.length]);

  const user = users.find((user) => user._id === id);

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
      <p>
        <span>Опыт работы:</span>{' '}
        {user.workExperience ? `${user.workExperience.fieldOfWork}, ${user.workExperience.duration}` : 'Не указано'}
      </p>
      <p>
        <span>О себе:</span> {user.aboutMe}
      </p>
      <button className="employee-btn" onClick={handleOpenDialog}>
        На рассмотрение
      </button>
      <SelectVacancyDialog open={openDialog} onClose={handleCloseDialog} userId={user._id} />
    </div>
  );
};

export default EmployeeProfile;
