import React from 'react';
import DashboardAdmin from './DashboardAdmin';
import { CssBaseline } from '@mui/material';

const BaseLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <DashboardAdmin>{children}</DashboardAdmin>
    </>
  );
};

export default BaseLayout;
