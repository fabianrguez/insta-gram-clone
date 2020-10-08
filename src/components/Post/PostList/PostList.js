import React, { useEffect, useState } from 'react';
import db from '../../../firebase';
import Post from '../Post';
import './PostList.css';

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        db.collection('posts')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot =>
                setPosts(snapshot.docs.map(doc => ({
                    id: doc.id,
                    post: doc.data()
                }))
                )
            );

    }, []);

    return (
        <div className="postlist">
            <div className="postlist_posts">
                {posts && posts.length > 0 ?
                    posts.map(({id, post}) => <Post key={id} id={id} {...post} />)
                    : <div className="postlist__nopost">
                        <h2>There are not posts to view</h2>
                    </div>
                }
            </div>
        </div>
    );
}

export default PostList;