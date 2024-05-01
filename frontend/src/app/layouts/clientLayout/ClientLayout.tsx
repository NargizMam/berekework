import Header from '../../../widgets/Header/ui/Header';
import Footer from '../../../client/widgets/footer/ui/Footer';
import React from 'react';

const ClientLayout: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <>
      <header>
        <Header/>
      </header>
      <main className="container">
        {children}
      </main>
      <footer>
        <Footer/>
      </footer>
    </>
  );
};

export default ClientLayout;