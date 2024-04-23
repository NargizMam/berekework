import Footer from '../../widgets/footer/ui/Footer';
import LastNewsBlock from '../../widgets/lastNewsBlock/ui/LastNewsBlock';
import GalleryVideoBlock from '../../widgets/galleryVideoBlock/ui/GalleryVideoBlock';

const HomePage = () => {
  return (
    <>
      {/*<MainCards />*/}
      <GalleryVideoBlock />
      <LastNewsBlock />
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default HomePage;
