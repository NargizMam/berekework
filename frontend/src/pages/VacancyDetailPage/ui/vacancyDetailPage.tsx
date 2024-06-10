import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, CircularProgress, Link, Typography } from '@mui/material';
import { Email, Phone } from '@mui/icons-material';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import dayjs from 'dayjs';
import { API_URL } from '../../../app/constants/links';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { getVacancyById } from '../../../feachers/vacancy/vacancyThunk';
import { selectVacancy, selectVacancyLoading } from '../../../feachers/vacancy/vacancySlice';
import './vacancyDetailPage.css';
import { getCandidateByEmployer, sendReplyByUser } from '../../../feachers/aplication/aplicationThunk';
import { selectCandidates } from '../../../feachers/aplication/applicationSlice';
import { selectEmployer, selectUser } from '../../../client/page/Auth/model/AuthSlice';

export const VacancyDetailPage = () => {
  const employer = useAppSelector(selectEmployer);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const { id } = useParams() as { id: string };
  const vacancy = useAppSelector(selectVacancy);
  const loading = useAppSelector(selectVacancyLoading);
  const candidates = useAppSelector(selectCandidates);

  useEffect(() => {
    if (id) {
      dispatch(getVacancyById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (employer) {
      dispatch(getCandidateByEmployer(id));
    }
  }, [dispatch, employer, id]);

  const sendReplyHandle = async (id: string) => {
    await dispatch(sendReplyByUser({ vacancyId: id, userId: user?._id })).unwrap();
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!vacancy) {
    return <div>Vacancy not found</div>;
  }

  return (
    <>
      <Box sx={{ marginTop: '20px' }} className="vacancyDetail">
        <div className="mainBlock">
          <div className="vacancyTitleBlock">
            <div className="vacancyTitle">
              <h2>{vacancy.vacancyTitle}</h2>
            </div>
            <div className="vacancySalary">
              <span className="minSalary">от {vacancy.salary.minSalary}</span>
              <span className="maxSalary"> до {vacancy.salary.maxSalary}</span>
            </div>
            <div className="employmentType">Тип занятости: {vacancy.employmentType}</div>
            {employer || user?.role === "superadmin" || user?.role === "admin" ? null : (
              <div className="vacancyButtons">
                <Button
                  onClick={() => sendReplyHandle(vacancy._id)}
                  variant="contained"
                  size="large"
                  color="success"
                  className="vacancyButton"
                >
                  Откликнуться
                </Button>
              </div>
            )}
          </div>
          <div className="aboutEmployer">
            <div className="employer-logo">
              {vacancy.employer ? <img src={API_URL + '/' + vacancy.employer.logo} alt="" /> : ''}
            </div>
            <div className="companyInfo">
              <h3 className="companyName">{vacancy.employer?.companyName}</h3>
              <p className="address">{vacancy.employer?.address}</p>
              <div className="location">
                <MyLocationIcon /> <span>{vacancy.city}</span>, <span>{vacancy.country}</span>
              </div>
              <div className="contacts-block">
                <span>Contacts:</span>
                <Link className="contacts" sx={{ cursor: 'pointer' }}>
                  <Phone /> {vacancy.employer?.contacts}
                </Link>
                <Link className="contacts" sx={{ cursor: 'pointer' }}>
                  <Email /> {vacancy.employer?.email}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="vacancy-info">
          <span className="employerDesc">{vacancy.employer?.description}</span>
          <div className="workConditions">
            <span>Что мы предлагаем:</span>
            <p>{vacancy.workConditions}</p>
          </div>
          <div className="workResponsibilities">
            <span>Обязанности:</span>

            <p>{vacancy.responsibilities}</p>
          </div>
          <div className="workRequirements">
            <span>Требования:</span>
            <p>Образование - {vacancy.education}</p>
            <p>
              Возраст - от {vacancy.age.minAge} до {vacancy.age.maxAge} лет
            </p>
          </div>
        </div>
        <div className="vacancyCreatedAt">
          <Typography color={'secondary'}>
            Вакансия создана: {dayjs(vacancy.createdAt).format('DD MMMM YYYY')}
          </Typography>
        </div>
      </Box>
      {employer ? (
        <Box>
          <h1>Откликнутые</h1>
          {candidates.map((candidate, index) => (
            <Box key={candidate._id}>
              <p>
                <span>{index + 1}</span>
                {candidate.user.name} - {candidate.user.preferredJob} - {candidate.employerStatus}
              </p>
            </Box>
          ))}
        </Box>
      ) : null}
    </>
  );
};
