import { Avatar, Button, Menu, MenuItem } from '@material-ui/core';
import { AddAPhoto, ExitToApp } from '@material-ui/icons';
import React, { useState } from 'react';
import { actionType } from '../../context/reducer';
import { useStateValue } from '../../context/StateProvider';
import { auth } from '../../firebase';
import './Header.css';

const Header = () => {
    const [{ user }, dispatch] = useStateValue();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleSignUpModalShown = () => {
        dispatch({
            type: actionType.SET_SIGNUP_MODAL_OPEN,
            signUpModalOpen: true
        });
    }

    const handleSignInModalShown = () => {
        dispatch({
            type: actionType.SET_SIGNIN_MODAL_OPEN,
            signInModalOpen: true
        });
    }

    const handleImageUploadModalShown = () => {
        dispatch({
            type: actionType.SET_IMAGEUPLOAD_MODAL_OPEN,
            imageUploadModalOpen: true
        });
    }

    const handleLogout = () => {
        dispatch({
            type: actionType.SET_USER,
            user: null
        });
        auth.signOut();
    }

    const handleOpenMenu = (e) => {
        setAnchorEl(e.currentTarget);
    }

    return (
        <header className="header">
            <img
                className="header__image"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
            />
            <div className="header__links">
                {!user ? (
                    <div className="header__notlogged">
                        <Button
                            className="header__login"
                            onClick={handleSignInModalShown}
                        >
                            Sign In
                        </Button>
                        <Button
                            className="header__signup"
                            onClick={handleSignUpModalShown}
                        >
                            Sign Up
                    </Button>
                    </div>
                ) : (
                        <div className="header__logged">
                            <AddAPhoto
                                className="header__addphoto"
                                fontSize="large"
                                onClick={handleImageUploadModalShown}
                            />
                            <Avatar
                                className="header__logout"
                                alt={user.displayName}
                                src=""
                                onClick={handleOpenMenu}
                            />
                            <Menu
                                className="header__menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={() => setAnchorEl(null)}
                                getContentAnchorEl={null}
                                anchorOrigin={{
                                  vertical: 'bottom',
                                  horizontal: 'center',
                                }}
                                transformOrigin={{
                                  vertical: 'top',
                                  horizontal: 'center',
                                }}
                            >
                                <MenuItem className="header__menuitem" onClick={handleLogout}>
                                    <ExitToApp className="header__menuitemicon"/>
                                    Sign Out
                                </MenuItem>
                            </Menu>
                        </div>
                    )
                }
            </div>
        </header>
    );
}

export default Header;