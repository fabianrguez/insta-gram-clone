import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import db from '../../../firebase';
import './CommentInput.css';
import { useStateValue } from '../../../context/StateProvider';
import firebase from 'firebase';

const CommentInput = ({postId, onCommentPublish}) => {
    const [comment, setComment] = useState('');
    const [{user}] = useStateValue();

    const handleAddComment = (e) => {
        e.preventDefault();
        db.collection('posts')
            .doc(postId)
            .collection('comments')
            .add({
                text: comment,
                username: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        onCommentPublish();
    }

    return (
        <form className="commentInput" onSubmit={handleAddComment}>
            <TextField
                className="commentInput__input"
                label="Add comment"
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <Button className="commentInput__button" type="submit">Publish</Button>
        </form>
    );
}

export default CommentInput;