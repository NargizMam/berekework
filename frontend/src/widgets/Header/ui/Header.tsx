import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { selectUser } from '../../../client/page/Auth/model/AuthSlice';
import UserMenu from '../UserMenu';
import { useSinglePrismicDocument } from '@prismicio/react';
import { Typography } from '@mui/material';
import '../css/style.css';
import '../css/media.css';
import { getProfile } from '../feauteres/user/user';
import { logout } from '../../../client/page/Auth/api/AuthThunk';

interface HeaderProps {
  body: [
    {
      id: string;
      items: [
        {
          name_link: string;
          navbar_link: string;
        },
      ];
    },
  ];
  header_logo: {
    url: string;
    alt: string;
    dimensions: {
      width: number;
      height: number;
    };
  };
  logo_link: string;
}

const Header = () => {
  const [document] = useSinglePrismicDocument('header');
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const headerPrismicResponse: HeaderProps | undefined = document?.data as HeaderProps;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    dispatch(logout()).unwrap();
    navigate('/login');
  };


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  const nav = (
    <nav className="navigation-big-screen">
      <ul className="main-mav-web">
        {headerPrismicResponse?.body[0].items &&
          headerPrismicResponse.body[0].items.map((item, index) => (
            <li key={index + headerPrismicResponse?.body[0].id} className="main-nav-item">
              <Typography component={Link} to={item.navbar_link} className={'main-nav-link'}>
                {item.name_link}
              </Typography>
            </li>
          ))}
      </ul>
    </nav>
  );
  return (
    <div className="main-container">
        <div className="header-content">
          <div className="header-logo-wrapper">
            {headerPrismicResponse?.header_logo && (
              <a href={headerPrismicResponse?.logo_link}>
                <img
                  src={headerPrismicResponse?.header_logo.url}
                  alt={headerPrismicResponse?.header_logo.alt}
                  style={{width: 220, height: 56}}
                />
              </a>
            )}
          </div>
          {nav}
          <div style={{display: 'flex', alignItems: 'center'}}>
            {!user ? (
              <NavLink to="/login" className={'login-open'}>
                Войти
              </NavLink>
            ) : (
              <UserMenu user={user}/>
            )}
            <button className="burger-button" type="button" onClick={toggleMenu}></button>
          </div>
          <nav className={isMenuOpen ? 'main-nav-open' : 'main-nav-close'}>
            <ul className="main-nav-list">
              {headerPrismicResponse?.body[0].items &&
                headerPrismicResponse.body[0].items.map((item, index) => (
                  <li key={index + 'navDrop'} className="main-nav-item">
                    <Typography component={Link} to={item.navbar_link} className={'main-nav-link'}>
                      {item.name_link}
                    </Typography>
                  </li>
                ))}
              {user &&
                <div className='burgerUser'>
                  <li className="main-nav-item">
                    <Typography className={'main-nav-link'} onClick={() => getProfile(user, navigate)}>
                      Мой профиль
                    </Typography>
                  </li>
                  <li className="main-nav-item">
                    <Typography onClick={handleLogout} className={'main-nav-link'}>
                      Выйти
                    </Typography>
                  </li>
                </div>
              }
            </ul>
          </nav>

        </div>
    </div>
  );
};

export default Header;
