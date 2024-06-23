import React, { useEffect } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { selectArchives, selectArchivesLoading } from '../../../../feachers/user/usersSlice';
import { archiveModels, getAllArchive } from '../../../../feachers/user/usersThunk';
import UserCrmTable from '../../../widgets/crmTable/userCrmTable';
import { toast } from 'react-toastify';
import EmployeeTable from '../../../widgets/crmTable/employeeTable';
import VacancyTableCrm from '../../../widgets/crmTable/vacancyTableCrm';
import ModeratorTableCrm from '../../../widgets/crmTable/moderatorTableCrm';

const CustomTabPanel = (props: { children?: React.ReactNode; index: number; value: number }) => {
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

export const ArchivePanel = () => {
  const archives = useAppSelector(selectArchives);
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState(0);
  const archiveLoading = useAppSelector(selectArchivesLoading);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getAllArchive());
  }, [dispatch]);

  const onArchiveUser = async (id: string) => {
    try {
      await dispatch(
        archiveModels({
          id: id,
          model: 'user',
        }),
      ).unwrap();
      await dispatch(getAllArchive());
      toast.success('Пользователь востановлен!');
    } catch (error) {
      toast.error('Что то пошло не так!');
    }
  };

  const onArchiveEmployee = async (id: string, email: string) => {
    try {
      await dispatch(
        archiveModels({
          id: id,
          model: 'employee',
        }),
      ).unwrap();
      await dispatch(getAllArchive());
      toast.success(`${email} востановлен!`);
    } catch (error) {
      toast.error('Что то пошло не так!');
    }
  };

  const onArchiveVacancy = async (id: string, isArchive: boolean, employeeEmail: string) => {
    if (isArchive) {
      toast.error(`Нужно сперва работодателя восстановить. Email ${employeeEmail}`);
      return;
    }

    try {
      await dispatch(
        archiveModels({
          id: id,
          model: 'vacancy',
        }),
      ).unwrap();
      await dispatch(getAllArchive());
      toast.success(`Вакансия востановлен!`);
    } catch (error) {
      toast.error('Что то пошло не так!');
    }
  };

  const onArchiveModerator = async (id: string) => {
    try {
      await dispatch(
        archiveModels({
          id: id,
          model: 'moderator',
        }),
      ).unwrap();
      await dispatch(getAllArchive());
      toast.success('Модератор востановлен!');
    } catch (error) {
      toast.error('Что то пошло не так!');
    }
  };

  return (
    <>
      <Box sx={{ width: '100%', mt: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Пользователи" {...a11yProps(0)} />
            <Tab label="Работодатели" {...a11yProps(1)} />
            <Tab label="Модераторы" {...a11yProps(2)} />
            <Tab label="Вакансии" {...a11yProps(3)} />
          </Tabs>
        </Box>
        {archives && (
          <>
            <CustomTabPanel value={value} index={0}>
              <UserCrmTable users={archives.users} isArchive={true} archiveUser={onArchiveUser} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <EmployeeTable
                isArchive={true}
                employers={archives.employee}
                handleArchiveEmployer={onArchiveEmployee}
                archiveLoading={archiveLoading}
              />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <ModeratorTableCrm
                moderators={archives.moderators}
                isArchive={true}
                onArchiveModerator={onArchiveModerator}
              />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
              <VacancyTableCrm
                isArchive={true}
                vacancies={archives.vacancies}
                unArchiveVacancyClick={onArchiveVacancy}
              />
            </CustomTabPanel>
          </>
        )}
      </Box>
    </>
  );
};
