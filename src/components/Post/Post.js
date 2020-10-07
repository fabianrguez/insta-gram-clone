import { Avatar } from '@material-ui/core';
import { formatDistanceToNow } from 'date-fns/esm';
import React, { useEffect, useState } from 'react';
import db from '../../firebase';
import Comment from './Comment/Comment';
import CommentInput from './CommentInput/CommentInput';
import Interactions from './Interactions/Interactions';
import './Post.css';

const Post = ({ username, imageUrl, caption, timestamp, id }) => {
    const [comments, setComments] = useState([]);
    const [showCommentInput, setShowCommentInput] = useState(false);
    const postDate = new Date(timestamp?.toDate());

    useEffect(() => {
        let unsubscribe;
        if (id) {
            unsubscribe = db.collection('posts')
                .doc(id)
                .collection('comments')
                .orderBy('timestamp', 'asc')
                .onSnapshot(snapshot =>
                    setComments(snapshot.docs.map(comment => comment.data())));
        }

        return () => unsubscribe();
    }, [id]);

    return (
        <div className="post">
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt="stofaya"
                    src=""
                />
                <h4 className="post__username">{username}</h4>
            </div>
            <img
                className="post__image"
                src={imageUrl}
                alt={''}
            />
            <Interactions
                onClickHeart={() => { }}
                onClickComment={() => setShowCommentInput(!showCommentInput)}
            />
            <h4 className="post__text"><strong>{username}</strong> {caption}</h4>
            <div className="post__comments">
                {comments.map((comment, index) => <Comment key={index} {...comment} />)}
                {showCommentInput &&
                    <CommentInput
                        postId={id}
                        onCommentPublish={() => setShowCommentInput(false)}
                    />
                }
            </div>
            <div className="post__timestamp">
                <time
                    dateTime={postDate}
                    title={postDate.toLocaleDateString()}
                >
                    {timestamp && formatDistanceToNow(postDate, { addSuffix: true, includeSeconds: true })}
                </time>
            </div>
        </div>
    );
}

export default Post;