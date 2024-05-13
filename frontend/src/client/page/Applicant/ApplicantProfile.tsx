import { useEffect } from 'react';
import { fetchApplicant } from '../../widgets/applicant/model/applicantThunk';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { selectUser } from '../Auth/model/AuthSlice';
import { selectOneApplicant, selectOneApplicantLoading } from '../../widgets/applicant/model/applicantSlice';
import { Loader } from '../../../shared/loader';
import { Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';
import './Applicant.css';
import { API_URL } from '../../../app/constants/links';
import {  NavLink } from 'react-router-dom';

const ApplicantProfile = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const applicantArray = useAppSelector(selectOneApplicant);
  const loading = useAppSelector(selectOneApplicantLoading);
  const applicant = applicantArray[0];
  const dayJS = dayjs;

  useEffect(() => {
    if (user) {
      dispatch(fetchApplicant(user._id));
    }
  }, [dispatch, user]);

  return (
    <div style={{marginTop: '40px'}}>
      <Typography variant="h4">Мой профиль</Typography>
      {loading ? (
        <Loader/>
      ) : (
        applicant ? (
          <Grid mt={4} container display="flex" flexDirection="column">
            <div className="photoFrame">
              <div className="photo">
                {applicant.photo ?
                  <img src={API_URL + '/' + applicant.photo} alt="Photo"/>
                  :
                  <Typography>Нет фото</Typography>
                }
              </div>
            </div>
            <Grid item display="flex" xs={4} justifyContent="space-between" mt={10} mb={2}>
              <Typography fontWeight={600}> ФИО: </Typography>
              <Typography>{applicant.firstName} </Typography>
              <Typography>{applicant.secondName} </Typography>
              <Typography>{applicant.surname} </Typography>
            </Grid>
            <Grid item display="flex" xs={4} mb={2}>
              <Typography fontWeight={600} mr={2}> Пол: </Typography>
              <Typography>{applicant.sex} </Typography>
            </Grid>
            <Grid item display="flex" xs={4} mb={2}>
              <Typography fontWeight={600} mr={2}> Дата рождения: </Typography>
              <Typography>{dayJS(applicant.dateOfBirth).format('DD.MM.YYYY')}</Typography>
            </Grid>
            <Grid item display="flex" xs={4} mb={2}>
              <Typography fontWeight={600} mr={2}> Страна: </Typography>
              <Typography>{applicant.country}</Typography>
            </Grid>
            <Grid item display="flex" xs={4} mb={2}>
              <Typography fontWeight={600} mr={2}> Город: </Typography>
              <Typography>{applicant.city}</Typography>
            </Grid>
            <Grid item display="flex" xs={6} mb={2}>
              <Typography fontWeight={600} mr={2}> Образование: </Typography>
              <Typography>{applicant.education}</Typography>
            </Grid>
            <Grid item display="flex" xs={6} mb={2}>
              <Typography fontWeight={600} mr={2}> О себе: </Typography>
              <Typography>{applicant.aboutApplicant}</Typography>
            </Grid>
            <Grid item display="flex" xs={6} mb={2}>
              <Typography fontWeight={600} mr={2}> Опыт работы: </Typography>
              {applicant.workExperience.map(work => (
                <Typography>{work.job}</Typography>
              ))}
            </Grid>
            <Grid item display="flex" xs={6} mb={2}>
              <Typography fontWeight={600} mr={2}> Ищу работу в сфере: </Typography>
              <Typography>{applicant.wantedJob}</Typography>
            </Grid>
            <Grid item display="flex" xs={6} mb={2}>
              <Typography fontWeight={600} mr={2}> В городе: </Typography>
              <Typography>{applicant.wantedJobCity}</Typography>
            </Grid>
            <NavLink to='/applicantRefactor' className='changeBtn'>Изменить</NavLink>
          </Grid>
        ) :   <NavLink to='/newApplicant' className='changeBtn'>Создать</NavLink>
      )}
    </div>
  );
};

export default ApplicantProfile;