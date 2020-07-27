import {
    NOTEBOOK_LOADING,
    CREATE_NOTEBOOK,
    DELETE_NOTEBOOK,
    UPDATE_NOTEBOOK,
    GET_NOTEBOOK
} from './types'
import API from "../api/api"
import {createError} from "./error"

// export const createNotebook = (notebook) => (dispatch) => {
//     dispatch(setNotebookLoading(true))
//     API
//         .get("notebooks/add", notebook)
//         .then((result) => dispatch({
//             type: CREATE_NOTEBOOK,
//             payload: result.data
//         }))
//         .catch((error) => {
//             dispatch(setNotebookLoading(false))
//         })
// }

export const getNotebook = (stringId) => (dispatch) => {
    dispatch(setNotebookLoading(true))
    API
        .get('notebooks/get', {
            params: {
                notebookId: stringId
            }
        })
        .then((result) => dispatch({
            type: GET_NOTEBOOK,
            payload: result.data
        }))
        .catch((error) => {
            dispatch(setNotebookLoading(false))

            if (error.response){
                dispatch(createError({type: GET_NOTEBOOK, code: error.response.status}))
            } else {
                dispatch(createError({type: GET_NOTEBOOK}))
            }

        })
}

export const updateNotebookName = (stringId, name) => (dispatch) => {
    API
        .get('notebooks/update', {
            params: {
                notebookId: stringId,
                name: name
            }
        })
        .then((result) => dispatch({
            type: UPDATE_NOTEBOOK,
            payload: name
        }))
        .catch((error) => {
            dispatch(createError({type: UPDATE_NOTEBOOK}))
        })
}

// export const deleteNotebook = (stringId) => (dispatch) => {
//
// }

const setNotebookLoading = (isLoading) => ({
    type: NOTEBOOK_LOADING,
    payload: isLoading
})