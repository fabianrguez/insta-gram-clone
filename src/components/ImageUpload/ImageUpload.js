import { Button, TextField } from '@material-ui/core';
import firebase from 'firebase';
import React, { useState } from 'react';
import { actionType } from '../../context/reducer';
import { useStateValue } from '../../context/StateProvider';
import db, { auth, storage } from '../../firebase';
import ModalGram from '../ModalGram/ModalGram';
import './ImageUpload.css';

const ImageUpload = () => {
    const [{ user, imageUploadModalOpen, uploadImageToProfile }, dispatch] = useStateValue();
    const [caption, setCaption] = useState('');
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState(null);

    const handleOnClose = () => {
        dispatch({
            type: actionType.SET_IMAGEUPLOAD_MODAL_OPEN,
            imageUploadModalOpen: false
        });
    }

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const storeImageToPost = (url) => {
        db.collection('posts')
        .add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            caption,
            imageUrl: url,
            username: user?.displayName
        });
    }

    const storeImageToProfile = (url) => {
        auth.currentUser.updateProfile({photoURL: url});
        dispatch({
            type: actionType.SET_USER,
            user: auth.currentUser
        });
        db.collection('users')
        .where('displayName', '==', user?.displayName)
        .update({photoURL: url});
    } 

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on('state_changed', snapshot => {
            const _progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(_progress);
        }, error => console.error(error)
            , () => {
                storage.ref('images')
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => uploadImageToProfile ? storeImageToProfile(url) : storeImageToPost(url));
                setProgress(0);
                setCaption('');
                setImage(null);
                handleOnClose();
            });
    }

    return (
        <div className="imageupload">
            <ModalGram open={imageUploadModalOpen} onClose={handleOnClose}>
                <h2 className="imageupload__title">Upload image</h2>
                <div className="imageupload__container">
                    {image &&
                        <img
                            className="imageupload__preview"
                            src={URL.createObjectURL(image)}
                            alt="preview"
                        />
                    }

                    <TextField
                        variant="outlined"
                        className="imageupload__caption"
                        multiline
                        rows={2}
                        label="Enter a caption..."
                        value={caption}
                        onChange={e => setCaption(e.target.value)}
                    />
                    <input type="file" onChange={handleChange} />
                    <progress className="imageupload__progress" value={progress} max="100" />
                    <Button
                        disabled={!image}
                        className="imageupload__upload"
                        onClick={handleUpload}>
                        Upload
                    </Button>
                </div>
            </ModalGram>
        </div>
    );
}

export default ImageUpload;