import { Avatar, Menu, MenuItem } from '@material-ui/core';
import { AddAPhoto, ExitToApp } from '@material-ui/icons';
import React, { useState } from 'react';
import { actionType } from '../../../context/reducer';
import { useStateValue } from '../../../context/StateProvider';
import { auth } from '../../../firebase';
import './LoggedActions.css';

const LoggedActions = () => {
    const [{user}, dispatch] = useStateValue();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleLogout = () => {
        dispatch({
            type: actionType.SET_USER,
            user: null
        });
        auth.signOut();
        setAnchorEl(null);
    }

    const handleOpenMenu = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleImageUploadModalShown = () => {
        dispatch({
            type: actionType.SET_IMAGEUPLOAD_MODAL_OPEN,
            imageUploadModalOpen: true
        });
    }

    return (
        <div className="loggedActions">
            <AddAPhoto
                className="loggedActions__addphoto"
                fontSize="large"
                onClick={handleImageUploadModalShown}
            />
            <Avatar
                className="loggedActions__avatar"
                alt={user.displayName}
                src=""
                onClick={handleOpenMenu}
            />
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
                <MenuItem className="loggedActions__menuitem" onClick={handleLogout}>
                    <ExitToApp className="loggedActions__menuitemicon" />
                        Sign Out
                </MenuItem>
            </Menu>
        </div>
    );
}

export default LoggedActions;