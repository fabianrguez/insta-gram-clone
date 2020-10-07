import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import ImageUpload from './components/ImageUpload/ImageUpload';
import PostList from './components/Post/PostList/PostList';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import { actionType } from './context/reducer';
import { useStateValue } from './context/StateProvider';
import { auth } from './firebase';

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
      <Header />
      <SignUp />
      <SignIn />
      <ImageUpload />
      {user ? (
        <PostList/>
      ) : (
          <div className="app__notlogged">
            <h3>You are not logged in</h3>
          </div>
        )}

    </div>
  );
}

export default App;
