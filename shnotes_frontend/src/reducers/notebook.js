import {
    NOTEBOOK_LOADING,
    CREATE_NOTEBOOK,
    DELETE_NOTEBOOK,
    UPDATE_NOTEBOOK,
    GET_NOTEBOOK
} from "../actions/types"

const initialState = {
    notebook: {
        stringId: '',
        name: ''
    },
    notebookLoading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case NOTEBOOK_LOADING:
            return {
                ...state,
                notebookLoading: action.payload
            }
        case GET_NOTEBOOK:
            return {
                ...state,
                notebook: action.payload,
                notebookLoading: false
            }
        case CREATE_NOTEBOOK:
            return {
                ...state,
                notebook: action.payload,
                notebookLoading: false
            }
        case UPDATE_NOTEBOOK:
            return {
                ...state,
                notebook: {
                    stringId: state.notebook.stringId,
                    name: action.payload
                }
            }
        default:
            return state
    }
}