import { Button } from '@material-ui/core';
import React from 'react';
import { actionType } from '../../../context/reducer';
import { useStateValue } from '../../../context/StateProvider';
import './NotLoggedActions.css';

const NotLoggedActions = () => {
    const [, dispatch] = useStateValue();

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

    return (
        <div className="notLoggedActions">
            <Button
                className="notLoggedActions__login"
                onClick={handleSignInModalShown}
            >
                Sign In
            </Button>
            <Button
                className="notLoggedActions__signup"
                onClick={handleSignUpModalShown}
            >
                Sign Up
            </Button>
        </div>
    );
}

export default NotLoggedActions;