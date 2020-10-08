import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStateValue } from '../../context/StateProvider';
import db from '../../firebase';
import Post from '../Post/Post';
import './Profile.css';

const Profile = () => {
    const [{ user }] = useStateValue();
    const { username } = useParams();
    const [userProfile, setUserProfile] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        db.collection('users')
            .where('displayName', '==', username)
            .get()
            .then(snapshot =>
                snapshot.forEach(result =>
                    setUserProfile(result.data())
                )
            );
        db.collection('posts')
            .where('username', '==', username)
            .onSnapshot(snapshot =>
                setPosts(snapshot.docs.map(doc => ({
                    id: doc.id,
                    post: doc.data()
                }))
                )
            );

    }, [username])

    return (
        <div className="profile">
            <div className="profile__header">
                <Avatar
                    className="profile__avatar"
                    src=""
                    alt={username}>
                    {userProfile && !userProfile?.photoUrl ? [...userProfile?.displayName][0] : ''}
                </Avatar>
                <div className="profile__name">
                    <h1> {userProfile?.displayName}</h1>
                    {user && user.displayName === userProfile?.displayName ?
                        <button className="profile__changeimage">Change profile photo</button>
                        : <></>
                    }
                </div>
            </div>
            <div className="profile__stats">
                <div className="profile__stat">
                    <span className="profile__statnumber">20</span>
                        posts
                </div>
                <div className="profile__stat">
                    <span className="profile__statnumber">20</span>
                        follow
                </div>
                <div className="profile__stat">
                    <span className="profile__statnumber">20</span>
                        followers
                </div>
            </div>
            <div className="profile__posts">
                {posts && posts.map(({id, post}) => <img className="profile__postimage" key={id} alt={post.caption} src={post.imageUrl}/>)}
            </div>
        </div>
    );
}

export default Profile;