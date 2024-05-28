import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../app/store/hooks';
import { selectUser } from '../../../client/page/Auth/model/AuthSlice';
import UserMenu from '../UserMenu';
import { useSinglePrismicDocument } from '@prismicio/react';
import { Container, Typography } from '@mui/material';
import '../css/style.css';
import '../css/media.css';

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useAppSelector(selectUser);

  const [document] = useSinglePrismicDocument('header');

  const headerPrismicResponse: HeaderProps | undefined = document?.data as HeaderProps;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const nav = (
    <nav>
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
    <div className="header">
      <Container>
        <div className="header-content">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {headerPrismicResponse?.header_logo && (
              <a href={headerPrismicResponse?.logo_link}>
                <img
                  src={headerPrismicResponse?.header_logo.url}
                  alt={headerPrismicResponse?.header_logo.alt}
                  style={{ width: 220, height: 56 }}
                />
              </a>
            )}
            <button className="burger-button" type="button" onClick={toggleMenu}></button>
          </div>
          {nav}
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
            </ul>
          </nav>
          {!user ? (
            <NavLink to="/login" className="login">
              Войти
            </NavLink>
          ) : (
            <UserMenu user={user} />
          )}
        </div>
      </Container>
    </div>
  );
};

export default Header;
