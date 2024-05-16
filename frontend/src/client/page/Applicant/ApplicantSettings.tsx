import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { useNavigate } from 'react-router-dom';
import {selectApplicantsLoading,} from '../../widgets/applicant/model/applicantSlice';
import { ApplicantMutation } from '../../widgets/applicant/types';
import { addApplicant } from '../../widgets/applicant/model/applicantThunk';
import './Applicant.css';
import ApplicantFullForm from '../../widgets/applicant/ui/Applicant/ApplicantFullForm';

const ApplicantSettings = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectApplicantsLoading);

  const onFormSubmit = async (applicantMutation: ApplicantMutation) => {
    try {
      await dispatch(addApplicant({applicantMutation})).unwrap();
      navigate('/');
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