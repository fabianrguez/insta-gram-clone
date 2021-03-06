import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { actionType } from '../../context/reducer';
import { useStateValue } from '../../context/StateProvider';
import db, { auth } from '../../firebase';
import ModalGram from '../ModalGram/ModalGram';
import './SignUp.css';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [{ signUpModalOpen }, dispatch] = useStateValue();

    const handleSignup = (e) => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(email, password)
            .then(authUser => {
                authUser.user.updateProfile({
                    displayName: username
                });
                db.collection('users').add({
                    displayName: username,
                    email: authUser.user.email,
                    photoURL: ''
                });
            })
            .catch(error => alert(error.message));
        dispatch({
            type: actionType.SET_SIGNUP_MODAL_OPEN,
            signUpModalOpen: false
        });
        setEmail('');
        setPassword('');
        setUsername('');
    }

    const handleModalClose = () => {
        dispatch({
            type: actionType.SET_SIGNUP_MODAL_OPEN,
            signUpModalOpen: false
        });
    }

    return (
        <div className="signUp">
            <ModalGram open={signUpModalOpen} onClose={handleModalClose}>
                <form className="signUp__form" onSubmit={handleSignup}>
                    <center>
                        <img
                            className="signUp__image"
                            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
                            alt=""
                        />
                    </center>
                    <TextField
                        label="Username"
                        variant="outlined"
                        type="text"
                        autoCapitalize="off"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        type="text"
                        value={email}
                        autoCapitalize="off"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" className="signUp__submit">Sign Up</Button>
                </form>
            </ModalGram>
        </div>
    );
}

export default SignUp;