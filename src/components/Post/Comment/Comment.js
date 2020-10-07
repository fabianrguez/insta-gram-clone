import React from 'react';
import './Comment.css';

const Comment = ({ text, username }) => {
    return (
        <div className="comment">
            <h4 className="comment__text"><strong>{username}</strong> {text}</h4>
        </div>
    );
}

export default Comment;