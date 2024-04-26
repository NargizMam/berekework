import Footer from '../../widgets/footer/ui/Footer';
import { MainCards } from '../../../admin/widgets/mainCards';
import LastNewsBlock from '../../../admin/widgets/lastNewsBlock/ui/LastNewsBlock';

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
