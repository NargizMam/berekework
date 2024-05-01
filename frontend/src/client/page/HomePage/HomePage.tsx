import Footer from '../../widgets/footer/ui/Footer';
import { MainCards } from '../../../admin/widgets/mainCards';
import LastNewsBlock from '../../widgets/lastNewsBlock/ui/LastNewsBlock';
import Header from '../../../widgets/Header/ui/Header';
import { TitleBlock } from '../../../admin/widgets/titleBlock';

const HomePage = () => {
  return (
    <>
      <header>
        <Header/>
      </header>
      <main>
        <MainCards/>
        <LastNewsBlock/>
        <TitleBlock data={{
          title: 'Найди работу, которая делает каждый день интересным',
          location: '/eqq',
          button: {
            url: '/',
            text: 'Перейти к вакансиям'
          }
        }}/>
      </main>
      <footer>
        <Footer/>
      </footer>
    </>
  );
};

export default HomePage;
