import { Avatar, Menu, MenuItem } from '@material-ui/core';
import { AccountCircleOutlined, AddAPhoto, ExitToApp, Home, HomeOutlined } from '@material-ui/icons';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { actionType } from '../../../context/reducer';
import { useStateValue } from '../../../context/StateProvider';
import { auth } from '../../../firebase';
import './LoggedActions.css';

const LoggedActions = () => {
    const [{ user }, dispatch] = useStateValue();
    const [anchorEl, setAnchorEl] = useState(null);
    const history = useHistory();
    const { pathname } = useLocation();

    const handleLogout = () => {
        dispatch({
            type: actionType.SET_USER,
            user: null
        });
        auth.signOut();
        setAnchorEl(null);
        history.push('/');
    }

    const handleOpenMenu = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleImageUploadModalShown = () => {
        dispatch({
            type: actionType.SET_IMAGEUPLOAD_MODAL_OPEN,
            imageUploadModalOpen: true,
            uploadImageToProfile: false
        });
        setAnchorEl(null);
    }

    const redirect = (uri) => {
        history.push(uri);
        setAnchorEl(null);
    }

    const showFirstLetterIfNotImage = () => {
        if (user && !user.photoURL && user.displayName) {
            return [...user.displayName][0].toUpperCase();
        } else {
            return;
        }
    }


    return (
        <div className="loggedActions">
            {pathname && pathname === '/' ?
                <Home
                    className="loggedActions__home"
                    fontSize="large" />
                :
                <HomeOutlined className="loggedActions__home" fontSize="large" onClick={() => redirect('/')} />
            }

            <Avatar
                className="loggedActions__avatar"
                alt={user?.displayName}
                src={user?.photoURL}
                onClick={handleOpenMenu}
            >
                {showFirstLetterIfNotImage()}
            </Avatar>
            <Menu
                className="loggedActions__menu"
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
                <MenuItem
                    className="loggedActions__menuitem"
                    onClick={() => redirect(`/profile/${user?.displayName}`)}
                >
                    <AccountCircleOutlined className="loggedActions__menuitemicon" />
                        Profile
                </MenuItem>
                <MenuItem className="loggedActions__menuitem" onClick={handleImageUploadModalShown}>
                    <AddAPhoto className="loggedActions__menuitemicon" />
                        Add photo
                </MenuItem>
                <MenuItem className="loggedActions__menuitem" onClick={handleLogout}>
                    <ExitToApp className="loggedActions__menuitemicon" />
                        Exit
                </MenuItem>
            </Menu>
        </div>
    );
}

export default LoggedActions;