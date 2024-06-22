import React, { useEffect } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { selectArchives } from '../../../../feachers/user/usersSlice';
import { getAllArchive } from '../../../../feachers/user/usersThunk';
import UserCrmTable from '../../../widgets/crmTable/userCrmTable';

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
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getAllArchive());
  }, [dispatch]);

  const archiveUser = (id: string) => {
    console.log(id);
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
              <UserCrmTable users={archives.users} isArchive={true} archiveUser={archiveUser} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              Employee
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              MODERATORS
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
              VACANCY
            </CustomTabPanel>
          </>
        )}
      </Box>
    </>
  );
};
