import React, { PropsWithChildren } from 'react';
import Header from '../../../widgets/Header/ui/Header';
import Footer from '../../../client/widgets/footer/ui/Footer';

const ClientLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <div className="main-container">{children}</div>
      </main>
      <footer style={{ marginTop: 'auto' }}>
        <Footer />
      </footer>
    </>
  );
};

export default ClientLayout;
