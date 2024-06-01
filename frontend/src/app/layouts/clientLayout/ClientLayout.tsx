import Header from '../../../widgets/Header/ui/Header';
import Footer from '../../../client/widgets/footer/ui/Footer';
import React from 'react';

const ClientLayout: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <>
      <header>
        <Header/>
      </header>
      <main >
        <div className='main-container'>
          {children}
        </div>
      </main>
      <footer style={{marginTop: 'auto'}}>
        <Footer/>
      </footer>
    </>
  );
};

export default ClientLayout;