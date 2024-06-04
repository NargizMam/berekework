import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, CircularProgress, Link, Typography } from "@mui/material";
import { Email, Phone } from "@mui/icons-material";
import MyLocationIcon from '@mui/icons-material/MyLocation';
import dayjs from "dayjs";
import { API_URL } from '../../../app/constants/links';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { getVacancyById } from '../../../feachers/vacancy/vacancyThunk';
import { selectVacancy, selectVacancyLoading } from '../../../feachers/vacancy/vacancySlice';
import './vacancyDetailPage.css';

export const VacancyDetailPage = () => {
  const dispatch = useAppDispatch();
  const id = useParams()?.id;
  const vacancy = useAppSelector(selectVacancy);
  const loading = useAppSelector(selectVacancyLoading);

  useEffect(() => {
    if (id) {
      dispatch(getVacancyById(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return <CircularProgress/>;
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
            <div className="vacancyButtons">
              <Button variant="contained" size="large" color="success" className="vacancyButton">
                Откликнуться
              </Button>
            </div>
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
    </>
  );
};