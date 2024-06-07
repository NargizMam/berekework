import { Box, CardActions, Tab, Tabs, Typography } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import './InterestedVacancies.css';
import './mediaInterestedVacancies.css';
import * as React from 'react';
import logo from './images/logo.png';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { selectReplies } from '../../../feachers/aplication/applicationSlice';
import { useEffect, useState } from 'react';
import { deleteReply, getReplyByUser, updateApplication } from '../../../feachers/aplication/aplicationThunk';
import dayjs from 'dayjs';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const InterestedVacancies = () => {
  const replies = useAppSelector(selectReplies);
  const dispatch = useAppDispatch();
  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    dispatch(getReplyByUser());
  }, [dispatch]);

  const selectTabs = (_event: React.SyntheticEvent, current: number) => {
    setCurrentTab(current);
  };

  const acceptedHandle = async (id: string) => {
    await dispatch(updateApplication({ id, userStatus: 'Заинтересован' })).unwrap();
    await dispatch(getReplyByUser());
  };

  const deleteHandle = async (id: string) => {
    await dispatch(deleteReply(id)).unwrap();
    await dispatch(getReplyByUser());
  };

  return (
    <div className="interested-vacancies-block">
      <div className="cards-div">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={currentTab} onChange={selectTabs} aria-label="basic tabs example">
            <Tab className="interested-vacancies-title" label="Заинтересованные вами" {...a11yProps(0)} />
            <Tab className="interested-vacancies-title" label="Отклики" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={currentTab} index={0}>
          {replies.map((reply) => {
            if (reply.createdBy === 'employer') {
              return (
                <Box className="card-vacancies">
                  <CardContent>
                    <Typography
                      sx={{
                        fontSize: 14,
                        background: '#F0F0F0',
                        padding: '10px 20px',
                        borderRadius: '30px',
                        width: '172px',
                        fontWeight: '500',
                        color: 'black',
                        textAlign: 'center',
                      }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {reply.userStatus}
                    </Typography>
                    <img className="logo" src={logo} alt="logo" />
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: '600',
                        marginTop: '40px',
                      }}
                      component="div"
                    >
                      {reply.vacancy.vacancyTitle}
                    </Typography>
                    <Typography
                      sx={{
                        color: '#8E8E8E',
                        margin: '30px 0 20px 0',
                      }}
                      color="text.secondary"
                    >
                      {reply.vacancy.employer.companyName}, {reply.vacancy.city}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 20,
                        fontWeight: '600',
                        color: '#00000',
                      }}
                      variant="body2"
                    >
                      от {reply.vacancy.salary.minSalary} до {reply.vacancy.salary.maxSalary} сом
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 14,
                        color: '#8E8E8E',
                        marginTop: '20px',
                      }}
                    >
                      <span
                        style={{
                          color: 'black',
                          marginRight: '5px',
                        }}
                      >
                        Дата:
                      </span>{' '}
                      {dayjs(reply.createdAt).format('DD.MM.YYYY')}
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {reply.userStatus !== 'Заинтересован' ? (
                      <button onClick={() => acceptedHandle(reply._id)} className="btn-connect btn-vacancies">
                        Связаться
                      </button>
                    ) : null}
                    <button onClick={() => deleteHandle(reply._id)} className="btn-recall btn-vacancies">
                      Отозвать
                    </button>
                  </CardActions>
                </Box>
              );
            }
            return null;
          })}
        </CustomTabPanel>
        <CustomTabPanel index={1} value={currentTab}>
          {replies.map((reply) => {
            if (reply.createdBy === 'user') {
              return (
                <Box className="card-vacancies">
                  <CardContent>
                    <Typography
                      sx={{
                        fontSize: 14,
                        background: '#F0F0F0',
                        padding: '10px 20px',
                        borderRadius: '30px',
                        width: '172px',
                        fontWeight: '500',
                        color: 'black',
                        textAlign: 'center',
                      }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {reply.userStatus}
                    </Typography>
                    <img className="logo" src={logo} alt="logo" />
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: '600',
                        marginTop: '40px',
                      }}
                      component="div"
                    >
                      {reply.vacancy.vacancyTitle}
                    </Typography>
                    <Typography
                      sx={{
                        color: '#8E8E8E',
                        margin: '30px 0 20px 0',
                      }}
                      color="text.secondary"
                    >
                      {reply.vacancy.employer.companyName},{reply.vacancy.city}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 20,
                        fontWeight: '600',
                        color: '#00000',
                      }}
                      variant="body2"
                    >
                      от {reply.vacancy.salary.minSalary} до {reply.vacancy.salary.maxSalary} сом
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 14,
                        color: '#8E8E8E',
                        marginTop: '20px',
                      }}
                    >
                      <span
                        style={{
                          color: 'black',
                          marginRight: '5px',
                        }}
                      >
                        Дата:
                      </span>{' '}
                      {dayjs(reply.createdAt).format('DD.MM.YYYY')}
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {reply.employerStatus === 'Принят' ? (
                      <button className="btn-connect btn-vacancies">Связаться</button>
                    ) : null}
                    <button onClick={() => deleteHandle(reply._id)} className="btn-recall btn-vacancies">
                      Отозвать
                    </button>
                  </CardActions>
                </Box>
              );
            }
            return null;
          })}
        </CustomTabPanel>
      </div>
    </div>
  );
};

export default InterestedVacancies;
