import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/store/hooks';
import { selectEmployer, selectUser } from '../../client/page/Auth/model/AuthSlice';

interface Props extends React.PropsWithChildren {
  employerOnly?: boolean;
}

const Permit: React.FC<Props> = ({ children, employerOnly }) => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const employer = useAppSelector(selectEmployer);
  console.log(user);
  console.log(employer);

  useEffect(() => {
    if (!user && !employer) {
      navigate('/');
    }
    if (employerOnly && !employer) {
      navigate('/');
    }
    if (employer && employer.isPublished === false) {
      navigate('/');
    }
  }, [user, employer]);

  return <>{children}</>;
};

export default Permit;
