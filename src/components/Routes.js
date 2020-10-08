import { Switch } from 'react-router-dom';
import React from 'react';
import { Route } from 'react-router-dom';
import { useStateValue } from '../context/StateProvider';
import PostList from './Post/PostList/PostList';
import Profile from './Profile/Profile';

const Routes = () => {
    const [{user}] = useStateValue();

    return (
        <Switch>
            <Route exact path="/">
                {user ? (
                    <PostList/>
                ) : (
                        <div className="app__notlogged">
                            <h3>You are not logged in</h3>
                        </div>
                    )}
            </Route>
            <Route path="/profile/:username">
                <Profile/>
            </Route>
        </Switch>
    );
}

export default Routes;