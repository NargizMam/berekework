import { CardActions, Typography } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import './InterestedVacancies.css';
import './mediaInterestedVacancies.css';
import * as React from 'react';
import logo from './images/logo.png';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { selectReplies } from '../../../feachers/aplication/applicationSlice';
import { useEffect, useState } from 'react';
import { getReplyByUser } from '../../../feachers/aplication/aplicationThunk';
import dayjs from 'dayjs';

const InterestedVacancies = () => {
  const replies = useAppSelector(selectReplies);
  const dispatch = useAppDispatch();
  const [reply, setReply] = useState(false);

  useEffect(() => {
    dispatch(getReplyByUser());
  }, [dispatch]);

  const card = (
    <React.Fragment>
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
          На рассмотрении
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
          Менеджер по продажам услуг
        </Typography>
        <Typography
          sx={{
            color: '#8E8E8E',
            margin: '30px 0 20px 0',
          }}
          color="text.secondary"
        >
          Satcom, Бишкек
        </Typography>
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: '600',
            color: '#00000',
          }}
          variant="body2"
        >
          от 25 000 до 35 000 сом
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
          21.04.2024
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <button className="btn-connect btn-vacancies">Связаться</button>
        <button className="btn-recall btn-vacancies">Отозвать</button>
      </CardActions>
    </React.Fragment>
  );

  return (
    <div className="interested-vacancies-block">
      <div className="cards-div">
        {!reply ? (
          <h6 className="interested-vacancies-title" onClick={() => setReply((prevState) => !prevState)}>
            Заинтересованные вами
          </h6>
        ) : (
          <h6 className="interested-vacancies-title" onClick={() => setReply((prevState) => !prevState)}>
            Отклики
          </h6>
        )}
        <div className="interested-vacancies-card-wrapper">
          {reply ? (
            replies.map((reply) => (
              <div className="card-vacancies">
                <React.Fragment>
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
                      {reply.status}
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
                    {reply.status === 'Принят' ? (
                      <button className="btn-connect btn-vacancies">Связаться</button>
                    ) : null}
                    <button className="btn-recall btn-vacancies">Отозвать</button>
                  </CardActions>
                </React.Fragment>
              </div>
            ))
          ) : (
            <>
              <div className="card-vacancies">{card}</div>
              <div className="card-vacancies">{card}</div>
              <div className="card-vacancies">{card}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterestedVacancies;
