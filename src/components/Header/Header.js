import React from 'react';
import { useStateValue } from '../../context/StateProvider';
import './Header.css';
import LoggedActions from './LoggedActions/LoggedActions';
import NotLoggedActions from './NotLoggedActions/NotLoggedActions';

const Header = () => {
    const [{ user }] = useStateValue();

    return (
        <header className="header">
            <img
                className="header__image"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
                alt=""
            />
            <div className="header__links">
                {!user ? <NotLoggedActions /> : <LoggedActions />}
            </div>
        </header>
    );
}

export default Header;