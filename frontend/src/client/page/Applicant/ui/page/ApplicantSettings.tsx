import { useAppDispatch, useAppSelector } from '../../../../../app/store/hooks';
import { useNavigate } from 'react-router-dom';
import { selectApplicantsLoading, } from '../../model/applicantSlice';
import { ApplicantMutation } from '../../types';
import { addApplicant } from '../../model/applicantThunk';
import './Applicant.css';
import ApplicantFullForm from '../components/Applicant/ApplicantFullForm';

const ApplicantSettings = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectApplicantsLoading);
  const onFormSubmit = async (applicantMutation: ApplicantMutation) => {
    try {
      await dispatch(addApplicant({applicantMutation})).unwrap();
      navigate('/applicantProfile');
    } catch {
      //
    }
  };

  return (
    <>
      <ApplicantFullForm
        applicant={null}
        onSubmit={onFormSubmit}
        loading={loading}
      />
    </>
  );
};

export default ApplicantSettings;