import {CREATE_ERROR, HAS_ERROR} from "./types"

export const setHasError = (hasError) => ({
    type: HAS_ERROR,
    payload: hasError
})

export const createError = (error) => (dispatch) => {
    dispatch(setHasError(true))

    dispatch({
        type: CREATE_ERROR,
        payload: error
    })
}