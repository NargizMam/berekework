import Header from '../../../widgets/Header/ui/Header';
import Footer from '../../../client/widgets/footer/ui/Footer';
import React from 'react';
import { Container } from '@mui/material';

const ClientLayout: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <>
      <header>
        <Header/>
      </header>
      <main >
        <Container  maxWidth="lg">
          {children}
        </Container>
      </main>
      <footer style={{marginTop: 'auto'}}>
        <Footer/>
      </footer>
    </>
  );
};

export default ClientLayout;