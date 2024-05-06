import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { useNavigate } from 'react-router-dom';
import { selectApplicantsLoading } from '../../applicant/model/applicantSlice';
import { ApplicantMutation } from '../../applicant/types';
import { addApplicant } from '../../applicant/model/applicantThunk';
import ApplicantForm from '../../applicant/ui/Applicant/ApplicantForm';
import { Grid } from '@mui/material';
import './ApplicantSettings.css';
import { selectUser } from '../Auth/model/AuthSlice';

const ApplicantSettings = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectApplicantsLoading);
  const user = useAppSelector(selectUser)
  console.log(user);
  const onFormSubmit = async (applicantMutation: ApplicantMutation) => {
    try {
      await dispatch(addApplicant(applicantMutation)).unwrap();
      navigate('/');
    } catch {
      //
    }
  };

  return (
    <div style={{marginTop: '70px'}}>
      <div className='whiteBackground'></div>
      <div className='applicantContainer'>
        <div className="photoFrame">
          <div className="photo"></div>
          <button className="photoBtn">+</button>
        </div>
        <h3 className="applicantSettingsHeader">Настройки профиля</h3>
        <Grid sx={{maxWidth: '850px'}}>
          <ApplicantForm onSubmit={onFormSubmit} loading={loading} applicantForm={null}/>
        </Grid>
      </div>
    </div>
  );
};

export default ApplicantSettings;