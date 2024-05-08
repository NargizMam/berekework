import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { useNavigate } from 'react-router-dom';
import {
  selectApplicantsLoading,
  selectOneApplicant
} from '../../widgets/applicant/model/applicantSlice';
import { ApplicantMutation } from '../../widgets/applicant/types';
import { addApplicant, fetchApplicant } from '../../widgets/applicant/model/applicantThunk';
import './ApplicantSettings.css';
import { useEffect } from 'react';
import { selectUser } from '../Auth/model/AuthSlice';
import ApplicantFullForm from '../../widgets/applicant/ui/Applicant/ApplicantFullForm';

const ApplicantSettings = () => {
  const dispatch = useAppDispatch();
  const applicant = useAppSelector(selectOneApplicant);
  const navigate = useNavigate();
  const loading = useAppSelector(selectApplicantsLoading);
  const user = useAppSelector(selectUser);


  useEffect(() => {
    if (user) {
      dispatch(fetchApplicant(user._id));
      console.log(applicant);
    }
  }, [dispatch]);


  const onFormSubmit = async (applicantMutation: ApplicantMutation) => {
    try {
      await dispatch(addApplicant(applicantMutation)).unwrap();
      navigate('/');
    } catch {
      //
    }
  };

  return (
    <>
      <ApplicantFullForm
        applicantForm={null}
        onSubmit={onFormSubmit}
        loading={loading}
      />
    </>
  );
};

export default ApplicantSettings;