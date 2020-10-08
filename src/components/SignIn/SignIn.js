import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { actionType } from '../../context/reducer';
import { useStateValue } from '../../context/StateProvider';
import { auth } from '../../firebase';
import ModalGram from '../ModalGram/ModalGram';
import './SignIn.css';

const SignIn = () => {
    const [{ signInModalOpen }, dispatch] = useStateValue();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleModalClose = () => {
        dispatch({
            type: actionType.SET_SIGNIN_MODAL_OPEN,
            signInModalOpen: false
        });
    }

    const handleSignIn = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
            .catch(error => alert(error.message));
            
        dispatch({
            type: actionType.SET_SIGNIN_MODAL_OPEN,
            signInModalOpen: false
        });
        setEmail('');
        setPassword('');
    } 

    return (
        <div className="signIn">
            <ModalGram open={signInModalOpen} onClose={handleModalClose}>
                <form className="signIn__form" onSubmit={handleSignIn}>
                    <center>
                        <img
                            className="signIn__image"
                            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
                            alt=""
                        />
                    </center>
                    <TextField
                        type="text"
                        value={email}
                        variant="outlined"
                        label="Email"
                        autoCapitalize={false}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        type="password"
                        value={password}
                        variant="outlined"
                        label="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" className="signIn__submit">Sign In</Button>
                </form>
            </ModalGram>
        </div>
    );
}

export default SignIn;