import { makeStyles, Modal } from '@material-ui/core';
import React, { useState } from 'react';

function getModalStyle() {
    const top = 50
    const left = 50 ;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        height: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        outline: 'none',
        borderRadius: '10px',
    },
}));

const ModalGram = ({ open, onClose, children }) => {
    const [modalStyle] = useState(getModalStyle);
    const classes = useStyles();

    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <div style={modalStyle} className={classes.paper}>
                {children}
            </div>
        </Modal>
    );
}

export default ModalGram;