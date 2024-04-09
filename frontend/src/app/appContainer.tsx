import React, { PropsWithChildren } from 'react';

const AppContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="container">{children}</div>;
};

export default AppContainer;