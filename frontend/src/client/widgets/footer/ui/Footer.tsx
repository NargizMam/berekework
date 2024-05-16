import '../css/footer.css';
import '../css/footerMedia.css';
import img from '../images/footer-logo.png';
import facebook from '../images/facebook.png';
import instagram from '../images/instagram.png';
import telegram from '../images/telegram.png';
import whatsapp from '../images/whatsapp.png';

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <h6 className="footer-title">Главная</h6>
            <nav className="footer-nav">
              <li className="footer-nav-item">
                <a href="#" className="footer-nav-link">
                  К вакансиям
                </a>
              </li>
              <li className="footer-nav-item">
                <a href="#" className="footer-nav-link">
                  Последние вакансии
                </a>
              </li>
              <li className="footer-nav-item">
                <a href="#" className="footer-nav-link">
                  Специалист
                </a>
              </li>
              <li className="footer-nav-item">
                <a href="#" className="footer-nav-link">
                  Новости
                </a>
              </li>
            </nav>
          </div>
          <div>
            <h6 className="footer-title">О нас</h6>
            <nav className="footer-nav">
              <li className="footer-nav-item">
                <a href="#" className="footer-nav-link">
                  Наша компания
                </a>
              </li>
              <li>
                <a href="#" className="footer-nav-link">
                  О нас
                </a>
              </li>
              <li className="footer-nav-item">
                <a href="#" className="footer-nav-link">
                  Наши ценности
                </a>
              </li>
              <li className="footer-nav-item">
                <a href="#" className="footer-nav-link">
                  Из преимуществ
                </a>
              </li>
              <li className="footer-nav-item">
                <a href="#" className="footer-nav-link">
                  Наши сотрудники
                </a>
              </li>
              <li className="footer-nav-item">
                <a href="#" className="footer-nav-link">
                  Галерея
                </a>
              </li>
              <li className="footer-nav-item">
                <a href="#" className="footer-nav-link">
                  Видео
                </a>
              </li>
            </nav>
          </div>
          <div>
            <h6 className="footer-title">Вакансии</h6>
            <nav className="footer-nav">
              <li className="footer-nav-item">
                <a href="#" className="footer-nav-link">
                  Все вакансии
                </a>
              </li>
            </nav>
          </div>
          <div>
            <h6 className="footer-title">Для работадателей</h6>
            <nav className="footer-nav">
              <li className="footer-nav-item">
                <a href="#" className="footer-nav-link">
                  Ищешь работника
                </a>
              </li>
              <li className="footer-nav-item">
                <a href="#" className="footer-nav-link">
                  Тарифы
                </a>
              </li>
            </nav>
          </div>
        </div>
        <div className="footer-bottom container">
          <img src={img} alt="logo-footer" className="logo-footer" />
          <div className="footer-bottom-text-content">
            <div className="footer-icon-div">
              <h6 className="footer-title">Мы в соц сетях</h6>
              <nav className="footer-nav footer-icon-bottom">
                <li className="footer-bottom-nav-item">
                  <a href="#" className="footer-nav-link">
                    <img className="icon-img" src={facebook} alt="facebook" />
                  </a>
                </li>
                <li className="footer-bottom-nav-item">
                  <a href="#" className="footer-nav-link">
                    <img src={telegram} alt="facebook" />
                  </a>
                </li>
                <li className="footer-bottom-nav-item">
                  <a href="#"  className="footer-nav-link">
                    <img src={instagram} alt="facebook" />
                  </a>
                </li>
                <li className="footer-bottom-nav-item">
                  <a href="#"  className="footer-nav-link">
                    <img src={whatsapp} alt="facebook" />
                  </a>
                </li>
              </nav>
            </div>
            <div className="footer-contacts">
              <h6 className="footer-title">Контактные данные</h6>
              <p className="footer-contacts-content">+ 996 707 34-22-70</p>
              <p className="footer-contacts-content">berekework@gmail.com</p>
            </div>
          </div>
        </div>
        <p className="footer-bottom-text">© 2022-2024. АО «BerekeWork», официальный сайт.</p>
      </div>
    </div>
  );
};

export default Footer;
