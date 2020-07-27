import {
    NOTES_LOADING,
    ADD_NOTE,
    DELETE_NOTE,
    UPDATE_NOTE,
    GET_NOTES
} from '../actions/types'

const initialState ={
    notes: [],
    noteLoading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case NOTES_LOADING:
            return {
                ...state,
                noteLoading: action.payload
            }
        case ADD_NOTE:
            return {
                ...state,
                notes: [action.payload, ...state.notes]
            }
        case DELETE_NOTE:
            return {
                ...state,
                notes: state.notes.filter((item) => item.id !== action.payload)
            }
        case UPDATE_NOTE:
            return {
                ...state,
                notes: state.notes.map((note) => note.id === action.payload.id ? action.payload : note)
            }
        case GET_NOTES:
            return {
                ...state,
                notes: action.payload,
                noteLoading: false
            }
        default:
            return state

    }
}