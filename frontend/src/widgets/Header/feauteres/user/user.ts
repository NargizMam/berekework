import { User } from '../../../../client/page/Auth/model/types';
import { NavigateFunction } from 'react-router-dom';



export const getProfile = (user: User, navigate: NavigateFunction) => {
  if (user.role === 'employer') {
    return navigate(`/employersProfile/${user._id}`);
  } else if (user.role === 'user') {
    return navigate(`/applicantProfile`);
  }
  navigate('/');
};
