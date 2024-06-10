import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/store/hooks';
import { selectEmployer, selectUser } from '../../client/page/Auth/model/AuthSlice';

const Permit: React.FC<React.PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const employer = useAppSelector(selectEmployer);

  useEffect(() => {
    if (!user || !employer) {
      navigate('/');
    }
    if (employer && employer.isPublished === false) {
      navigate('/');
    }
  }, [user, employer]);

  return <>{children}</>;
};

export default Permit;
