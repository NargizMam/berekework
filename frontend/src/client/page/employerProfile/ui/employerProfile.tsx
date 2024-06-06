import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Tab, Tabs, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { Loader } from '../../../../shared/loader';
import { useNavigate, useParams } from 'react-router-dom';

import {
  selectEmployerLoading,
  selectEmployersProfileInfo,
} from '../../../../admin/page/employerPanel/model/employerSlice';
import './employerProfile.css';
import { CreateVacancyForm } from '../../../widgets/createVacancyForm';
import { getEmployersProfileInfo } from '../../../../admin/page/employerPanel/api/employerThunk';
import { VacancyCard } from '../../../../feachers/vacancyCard';
import { MyPotentialEmployeeTable, NewPotentialEmployeeTable } from '../../../widgets/PotentialEmployeeTable';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3, pb: 3 }}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index: number) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});

const EmployerProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const [openVacancyForm, setOpenVacancyForm] = useState(false);
  const profile = useAppSelector(selectEmployersProfileInfo);
  const loading = useAppSelector(selectEmployerLoading);
  const navigate = useNavigate();

  const [value, setValue] = React.useState(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // const apiURL = 'http://localhost:8000';
  // const image = apiURL + '/' + profile?.logo;
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getEmployersProfileInfo(id));
    }
  }, [dispatch, id]);

  if (loading) return <Loader />;

  return (
    <div style={{ position: 'relative' }}>
      <Button
        variant="outlined"
        sx={{ position: 'absolute', top: '20px', right: '50px' }}
        onClick={() => navigate(`/edit-employer/${profile?._id}`)}
      >
        Редактировать профиль
      </Button>
      <div className="createVacancyContainer">
        {profile?.isPublished && (
          <Button variant="outlined" onClick={() => setOpenVacancyForm(true)}>
            Создать вакансию
          </Button>
        )}
      </div>

      {profile && (
        <Grid mt={6}>
          <div className="companyHeader">
            <img
              className="companyLogo"
              src={`http://localhost:8000/${profile.logo}`}
              alt="Логотип компании"
              height="100px"
            />
            <Typography ml={2} variant="h4">
              {profile.companyName}
            </Typography>
          </div>
          <p className="companyInfo">
            <strong>Сфера деятельности:</strong> {profile.industry}
          </p>
          <p className="companyInfo">
            <strong>Описание:</strong> {profile.description}
          </p>
          <p className="companyInfo">
            <strong>Адрес:</strong> {profile.address}
          </p>
          <p className="companyInfo">
            <strong>Контакты:</strong> {profile.contacts}
          </p>
          <a className="companyLink" href={profile.document || '#'} download>
            Скачать документы
          </a>
          <Grid mt={6} mb={6}>
            <Typography mb={2} variant="h5">
              Ваши вакансии:
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px 0',
              }}
            >
              {profile.vacancies.length > 0 ? (
                profile.vacancies.map((vacancy) => <VacancyCard key={vacancy._id} data={vacancy} visible={true} />)
              ) : (
                <h6>Добавьте свои вакансии</h6>
              )}
            </Box>
          </Grid>
        </Grid>
      )}

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Вакансии" {...a11yProps(0)} />
            <Tab label="Новые заявки" {...a11yProps(1)} />
            <Tab label="Мои заявки" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          Здесь должна быть таблица созданных вакансиий где у каждой вакансии есть кнопка удалить и редактировать
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <NewPotentialEmployeeTable />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <MyPotentialEmployeeTable />
        </CustomTabPanel>
      </Box>

      {openVacancyForm && (
        <>
          <Typography variant="h4">Создайте свои вакансии</Typography>
          <CreateVacancyForm setOpenForm={setOpenVacancyForm} />
        </>
      )}
    </div>
  );
};

export default EmployerProfile;
