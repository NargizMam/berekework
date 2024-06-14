import React from 'react';
import Dashboard from './Dashboard';
import { CssBaseline } from '@mui/material';

const BaseLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <Dashboard>{children}</Dashboard>
    </>
  );
};

export default BaseLayout;
