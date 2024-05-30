import { useEffect } from 'react';
import { fetchApplicant } from '../../model/applicantThunk';
import { useAppDispatch, useAppSelector } from '../../../../../app/store/hooks';
import { selectUser } from '../../../Auth/model/AuthSlice';
import { selectOneApplicant, selectOneApplicantLoading } from '../../model/applicantSlice';
import { Loader } from '../../../../../shared/loader';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import './Applicant.css';
import { API_URL } from '../../../../../app/constants/links';
import { NavLink } from 'react-router-dom';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EditIcon from '@mui/icons-material/Edit';

const ApplicantProfile = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const applicantArray = useAppSelector(selectOneApplicant);
  const loading = useAppSelector(selectOneApplicantLoading);
  const applicant = applicantArray[0];

  useEffect(() => {
    if (user) {
      dispatch(fetchApplicant(user._id));
    }
  }, [dispatch, user]);

  const birthDateDayjs = dayjs(applicant?.dateOfBirth);
  const now = dayjs();
  const age = now.diff(birthDateDayjs, 'year');

  return (
    <div style={{marginTop: '40px'}}>
      <Typography variant="h4"></Typography>
      {loading ? (
        <Loader/>
      ) : (
        applicant ? (
            <div className='profileContainer'>
              <div className="whiteBackground"></div>
              <div className="applicantContainer">
                <div className="photoFrame">
                  {applicant.photo ?
                    <img className="photo" src={API_URL + '/' + applicant.photo} alt="Photo"/>
                    :
                    <div className="photo">
                      <Typography>Нет фото</Typography>
                    </div>
                  }
                </div>
                <p className="profileTitle">{applicant.surname} {applicant.firstName} {applicant.secondName}</p>
                <p className="applicantInfo">{applicant.wantedJob}</p>
                <div className="infoBlock">
                  <div style={{display: 'flex', marginBottom: '40px', marginRight: '40px', alignItems: 'center'}}>
                    <PersonOutlineIcon sx={{marginRight: '5px'}}/>
                    <p style={{margin: 0}} className="applicantInfo"> {age} года</p>
                  </div>
                  <div style={{display: 'flex', marginBottom: '40px', alignItems: 'center'}}>
                    <LocationOnIcon sx={{marginRight: '5px'}}/>
                    <p style={{margin: 0}} className="applicantInfo">{applicant.country}, {applicant.city}</p>
                  </div>
                </div>
                <p className="applicantInfo">{applicant.aboutApplicant}</p>

                <NavLink to="/applicantRefactor" className="changeBtn">
                  <EditIcon style={{color: '#FFFFFF', marginRight: '20px'}}/>
                  Редактировать профиль
                </NavLink>
              </div>
            </div>
          ) :
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Typography variant="h4">Данных нет</Typography>
            <NavLink to="/newApplicant" className="changeBtn">Создать</NavLink>
          </div>
      )}
    </div>
  );
};

export default ApplicantProfile;