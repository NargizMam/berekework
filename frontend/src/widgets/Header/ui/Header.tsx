import { useEffect, useState } from 'react';
import '../css/style.css';
import '../css/media.css';
import logo from '../images/logo-company.png';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { selectHeader } from '../../../admin/page/headerCreate/model/headerSlice';
import { fetchHeader } from '../../../admin/page/headerCreate/api/headerThunks';
import { NavLink } from 'react-router-dom';
import { selectUser } from '../../../client/page/Auth/model/AuthSlice';
import UserMenu from '../UserMenu';


const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dispatch = useAppDispatch();
    const header = useAppSelector(selectHeader);
    const user = useAppSelector(selectUser);

    useEffect(() => {
        dispatch(fetchHeader());
    }, [dispatch]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const nav = (
        <nav>
            <ul className="main-mav-web">
                {header?.navbarItems && header.navbarItems.map((item) => (
                    <li key={item.nameNav} className="main-nav-item">
                        <a className="main-nav-link" href={item.link}>{item.nameNav}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );

    const links = [(
      <>
        <a>Главная</a>
        <a>О нас</a>
        <a>Вакансии</a>
        <a>Для работодателей</a>
      </>
    )];

  return (
        <div className="header">
            <div className="header-content container">
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <a href="/">
                        <img src={logo} alt="logo"/>
                    </a>
                    <button className="burger-button" type="button" onClick={toggleMenu}></button>
                </div>
                {nav}
                <nav className={isMenuOpen ? 'main-nav-open' : 'main-nav-close'}>
                    <ul className="main-nav-list">
                        {links.map(() => (
                            <li className="main-nav-item">
                                <a className="main-nav-link" ></a>
                            </li>
                        ))}
                    </ul>
                </nav>
                {!user ?
                  (<NavLink to='/login' className="login">Войти</NavLink>)
                    :
                  (<UserMenu user={user}/>)}
            </div>
        </div>
    );
};

export default Header;
