import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid, Link,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { Loader } from '../../../../shared/loader';
import { useNavigate, useParams } from 'react-router-dom';

import {
  selectEmployerLoading,
  selectEmployersProfileInfo,
} from '../../../../admin/page/employerPanel/model/employerSlice';
import './employerProfile.css';
// import { CreateVacancyForm } from '../../../widgets/createVacancyForm';
import { getEmployersProfileInfo } from '../../../../admin/page/employerPanel/api/employerThunk';
import { MyPotentialEmployeeTable, NewPotentialEmployeeTable } from '../../../widgets/PotentialEmployeeTable';
import { VacancyTable } from '../../../widgets/VacancyTable';
import { deleteReply, getCandidates } from '../../../../feachers/aplication/aplicationThunk';
import { selectApplicationForEmployees } from '../../../../feachers/aplication/applicationSlice';
import { ApplicationResponse } from '../../../../feachers/aplication/types';
import { selectVacancyDeleteLoading } from '../../../../feachers/vacancy/vacancySlice';
import { deleteVacancy } from '../../../../feachers/vacancy/vacancyThunk';
import { API_URL } from '../../../../app/constants/links';

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
  const navigate = useNavigate();
  // const [openVacancyForm, setOpenVacancyForm] = useState(false);
  const profile = useAppSelector(selectEmployersProfileInfo);
  const loading = useAppSelector(selectEmployerLoading);

  const application = useAppSelector(selectApplicationForEmployees);
  const [myApplication, setMyApplication] = useState<ApplicationResponse[]>([]);
  const [newApplication, setNewApplication] = useState<ApplicationResponse[]>([]);

  const [vacancyId, setVacancyId] = useState<string | null>(null);
  const deleteLoading = useAppSelector(selectVacancyDeleteLoading);
  const [value, setValue] = React.useState(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const { id } = useParams() as { id: string };

  useEffect(() => {
    if (id) {
      dispatch(getEmployersProfileInfo(id));
    }
  }, [dispatch, id]);

  const onDeleteConfirm = async () => {
    if (vacancyId) {
      await dispatch(deleteVacancy(vacancyId));

      if (id) {
        dispatch(getEmployersProfileInfo(id));
      }
      setVacancyId(null);
    }
  };

  const onDeleteCancel = () => {
    setVacancyId(null);
  };

  const onVacancyDelete = (id: string) => {
    setVacancyId(id);
  };

  useEffect(() => {
    dispatch(getCandidates());
  }, [dispatch]);

  useEffect(() => {
    if (application.length > 0) {
      setMyApplication([]);
      setNewApplication([]);
      application.forEach((item) => {
        if (item['createdBy'] === 'employer') {
          setMyApplication((prevState) => [...prevState, item]);
        } else {
          setNewApplication((prevState) => [...prevState, item]);
        }
      });
    } else {
      setMyApplication([]);
      setNewApplication([]);
    }
  }, [application]);

  const deleteHandle = async (id: string) => {
    await dispatch(deleteReply(id)).unwrap();
    await dispatch(getCandidates());
  };

  if (loading) return <Loader />;

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mt: 3,
        }}
      >
        <Button variant="outlined" onClick={() => navigate(`/edit-employer/${profile?._id}`)}>
          Редактировать профиль
        </Button>
      </Box>
      {profile && (
        <Grid mt={6}>
          <div className="companyHeader">
            <img
              className="companyLogo"
              src={`http://localhost:8000/${profile.avatar}`}
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
          <Link target="_blank" className="companyLink" href={API_URL + '/' + profile.documents}>
            Скачать документы
          </Link>
          <Box sx={{ display: 'flex', mt: 2, flexDirection: { xs: 'column', sm: 'row' } }}>

            {profile?.isPublished && (
              <Button
                variant="outlined"
                sx={{ marginLeft: { xs: 0, sm: 1 }, mt: { xs: 1, sm: 0 } }}
                onClick={() => navigate('/vacancy/edit')}
              >
                Создать вакансию
              </Button>
            )}
          </Box>
        </Grid>
      )}

      <Box sx={{ width: '100%', mt: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Вакансии" {...a11yProps(0)} />
            <Tab label="Новые заявки" {...a11yProps(1)} />
            <Tab label="Мои заявки" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          {profile && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px 0',
              }}
            >
              {profile.vacancies.length > 0 ? (
                <VacancyTable
                  vacancies={profile.vacancies}
                  vacancyDelete={onVacancyDelete}
                  deleteLoading={deleteLoading}
                />
              ) : (
                <h6>Добавьте свои вакансии</h6>
              )}
            </Box>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <NewPotentialEmployeeTable data={newApplication} deleteHandle={deleteHandle} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <MyPotentialEmployeeTable data={myApplication} deleteHandle={deleteHandle} />
        </CustomTabPanel>
      </Box>

      {/*{openVacancyForm && (*/}
      {/*  <>*/}
      {/*    <Typography variant="h4">Создайте свои вакансии</Typography>*/}
      {/*    <CreateVacancyForm/>*/}
      {/*  </>*/}
      {/*)}*/}
      <Dialog open={Boolean(vacancyId)} onClose={onDeleteCancel}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>Вы действительно хотите удалить эту вакансию ?</DialogContent>
        <DialogActions>
          <Button onClick={onDeleteConfirm}>Да</Button>
          <Button onClick={onDeleteCancel}>Нет</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EmployerProfile;
