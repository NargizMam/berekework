import Footer from '../../widgets/footer/ui/Footer';
import LastNewsBlock from '../../../widgets/lastNewsBlock/ui/LastNewsBlock';
import { MainCards } from '../../../widgets/mainCards';

const HomePage = () => {
  return (
    <>
      <MainCards />
      <LastNewsBlock />
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default HomePage;
