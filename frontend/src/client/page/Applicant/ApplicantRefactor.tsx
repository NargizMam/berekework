import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { useEffect } from 'react';
import { selectUser } from '../Auth/model/AuthSlice';
import {
  selectApplicantsLoading,
  selectOneApplicant,
} from '../../widgets/applicant/model/applicantSlice';
import { addApplicant, fetchApplicant } from '../../widgets/applicant/model/applicantThunk';
import { ApplicantMutation } from '../../widgets/applicant/types';
import { useNavigate } from 'react-router-dom';
import ApplicantFullForm from '../../widgets/applicant/ui/Applicant/ApplicantFullForm';


const ApplicantRefactor = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const applicantArray = useAppSelector(selectOneApplicant);
  const applicant = applicantArray[0];
  const navigate = useNavigate();
  const loading = useAppSelector(selectApplicantsLoading);


  useEffect(() => {
    if (user) {
      dispatch(fetchApplicant(user._id));
    }
  }, [dispatch, user]);


  const onFormSubmit = async (applicantMutation: ApplicantMutation) => {
    try {
      if (user) {
        await dispatch(addApplicant({ applicantMutation, userId: user._id })).unwrap();
      }
      navigate('/');
    } catch {
      //
    }
  };

  return (
    <>
      <ApplicantFullForm
        applicant={applicant}
        onSubmit={onFormSubmit}
        loading={loading}
      />
    </>
  );
};

export default ApplicantRefactor;