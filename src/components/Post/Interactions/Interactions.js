import { ChatBubbleOutline, FavoriteBorder } from '@material-ui/icons';
import React from 'react';
import './Interactions.css';

const Interactions = ({onClickComment, onClickHeart}) => {
    return (
        <div className="interactions">
            <span
                title="Like post" 
                className="interactions__interaction"
                onClick={onClickHeart}
            >
                <FavoriteBorder />
            </span>
            <span
                title="Add a comment"
                className="interactions__interaction"
                onClick={onClickComment}>
                <ChatBubbleOutline />
            </span>
        </div>
    );
}

export default Interactions;