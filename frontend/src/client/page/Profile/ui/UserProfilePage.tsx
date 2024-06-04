import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { selectUser } from '../../Auth/model/AuthSlice';
import { Loader } from '../../../../shared/loader';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import './Applicant.css';
import { API_URL } from '../../../../app/constants/links';
import { NavLink, Navigate } from 'react-router-dom';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EditIcon from '@mui/icons-material/Edit';
import InterestedVacancies from '../../../widgets/InterestedVacancies/InterestedVacancies';
import { getSingleUser } from '../../../../feachers/user/usersThunk';
import { selectProfile, selectProfileLoading } from '../../../../feachers/user/usersSlice';

export const UserProfilePage = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);
  const loading = useAppSelector(selectProfileLoading);

  useEffect(() => {
    if (user) {
      dispatch(getSingleUser(user._id));
    }
  }, [dispatch, user]);

  const birthDateDayjs = dayjs(profile?.dateOfBirth);
  const now = dayjs();
  const age = now.diff(birthDateDayjs, 'year');

  if (loading) {
    return <Loader />;
  }

  if (!profile) {
    return <Navigate to={'/login'} />;
  }

  return (
    <div style={{ marginTop: '40px', marginBottom: '100px' }}>
      <div className="profileContainer">
        <div className="whiteBackground"></div>
        <div className="applicantContainer">
          <div className="photoFrame">
            {profile.avatar ? (
              <img className="photo" src={API_URL + '/' + profile.avatar} alt="Photo" />
            ) : (
              <div className="photo">
                <Typography>Нет фото</Typography>
              </div>
            )}
          </div>
          <p className="profileTitle">
            {profile.surname} {profile.name}
          </p>
          <p className="applicantInfo">{profile.preferredJob}</p>
          <div className="infoBlock">
            <div style={{ display: 'flex', marginBottom: '40px', marginRight: '40px', alignItems: 'center' }}>
              <PersonOutlineIcon sx={{ marginRight: '5px' }} />
              <p style={{ margin: 0 }} className="applicantInfo">
                {' '}
                {age} года
              </p>
            </div>
            <div style={{ display: 'flex', marginBottom: '40px', alignItems: 'center' }}>
              <LocationOnIcon sx={{ marginRight: '5px' }} />
              <p style={{ margin: 0 }} className="applicantInfo">
                {profile.country}, {profile.city}
              </p>
            </div>
          </div>
          <p className="applicantInfo">{profile.aboutMe}</p>

          <NavLink to="/applicantRefactor" className="changeBtn">
            <EditIcon style={{ color: '#FFFFFF', marginRight: '20px' }} />
            Редактировать профиль
          </NavLink>
          <InterestedVacancies />
        </div>
      </div>
    </div>
  );
};
