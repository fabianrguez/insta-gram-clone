export const initialState = {
    user: null,
    signUpModalOpen: false,
    signInModalOpen: false,
    imageUploadModalOpen: false
}

export const actionType = {
    SET_USER: 'SET_USER',
    SET_SIGNIN_MODAL_OPEN: 'SET_SIGNIN_MODAL_OPEM',
    SET_SIGNUP_MODAL_OPEN: 'SET_SIGNUP_MODAL_OPEN',
    SET_IMAGEUPLOAD_MODAL_OPEN: 'SET_IMAGEUPLOAD_MODAL_OPEN',
}

const reducer = (state, action) => {
    switch(action.type) {
        case actionType.SET_USER:
            return {
                ...state,
                user: action.user
            }
        case actionType.SET_SIGNUP_MODAL_OPEN:
            return {
                ...state,
                signUpModalOpen: action.signUpModalOpen
            }
        case actionType.SET_SIGNIN_MODAL_OPEN:
            return {
                ...state,
                signInModalOpen: action.signInModalOpen
            }
        case actionType.SET_IMAGEUPLOAD_MODAL_OPEN:
            return {
                ...state,
                imageUploadModalOpen: action.imageUploadModalOpen
            }
        default:
            return state;
    }
}

export default reducer;