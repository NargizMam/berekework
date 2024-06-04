import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { useEffect } from 'react';
import { selectUser } from '../../Auth/model/AuthSlice';
import { UserMutation } from '../model/types';
import { Navigate, useNavigate } from 'react-router-dom';
import ApplicantFullForm from '../../../widgets/Applicant/ApplicantFullForm';
import { changeProfile, getSingleUser } from '../../../../feachers/user/usersThunk';
import { selectProfile, selectProfileLoading } from '../../../../feachers/user/usersSlice';

export const UserProfileFormPage = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);
  const navigate = useNavigate();
  const loading = useAppSelector(selectProfileLoading);

  useEffect(() => {
    if (user) {
      dispatch(getSingleUser(user._id));
    }
  }, [dispatch, user]);

  const onFormSubmit = async (profileMutation: UserMutation) => {
    try {
      if (user) {
        await dispatch(changeProfile({ profileMutation, userId: user._id })).unwrap();
      }
      navigate('/applicantProfile');
    } catch (error) {
      console.log(error);
    }
  };

  if (!profile) {
    return <Navigate to='/login'/>;
  }

  return <ApplicantFullForm applicant={profile} onSubmit={onFormSubmit} loading={loading} />;
};
