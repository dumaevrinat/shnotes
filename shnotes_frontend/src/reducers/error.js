import {CREATE_ERROR, HAS_ERROR} from "../actions/types"

const initialState = {
    hasError: false,
    error: {
        type: null,
        code: null
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case HAS_ERROR:
            return {
                ...state,
                hasError: action.payload
            }
        default:
            return state
    }
}