import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import ImageUpload from './components/ImageUpload/ImageUpload';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import { actionType } from './context/reducer';
import { useStateValue } from './context/StateProvider';
import { auth } from './firebase';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './components/Routes';

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch({
          type: actionType.SET_USER,
          user: authUser
        });
      }
    });

    return () => unsubscribe();
  }, [dispatch, user]);

  return (
    <div className="app">
      <Router>
        <Header />
        <SignUp />
        <SignIn />
        <ImageUpload />
        <Routes/>
      </Router>

    </div>
  );
}

export default App;
