import {
    NOTEBOOK_LOADING,
    CREATE_NOTEBOOK,
    DELETE_NOTEBOOK,
    UPDATE_NOTEBOOK,
    GET_NOTEBOOK
} from './types'
import API from "../api/api"
import {createError} from "./error"

export const createNotebook = (notebook) => ({
    type: CREATE_NOTEBOOK,
    payload: notebook,
    meta: {
        offline: {
            effect: {
                url: 'https://dumaev.digital/api/v1/notebooks/add',
                method: 'POST',
                data: notebook
            },
            commit: {type: 'CREATE_NOTEBOOK_COMMIT', meta: {notebook}},
            rollback: {type: 'CREATE_NOTEBOOK_ROLLBACK', meta: {notebook}}
        }
    }
})

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

            if (error.response) {
                dispatch(createError({type: GET_NOTEBOOK, code: error.response.status}))
            } else {
                dispatch(createError({type: GET_NOTEBOOK}))
            }

        })
}

export const updateNotebookName = (stringId, name) => ({
    type: UPDATE_NOTEBOOK,
    payload: name,
    meta: {
        offline: {
            effect: {
                url: 'https://dumaev.digital/api/v1/notebooks/update',
                method: 'GET',
                params: {notebookId: stringId, name: name}
            },
            commit: {type: 'UPDATE_NOTEBOOK_COMMIT', meta: {name}},
            rollback: {type: 'UPDATE_NOTEBOOK_ROLLBACK', meta: {name}}
        }
    }
});

export const deleteNotebook = (stringId) => ({
    type: DELETE_NOTEBOOK,
    payload: stringId,
    meta: {
        offline: {
            effect: {
                url: 'https://dumaev.digital/api/v1/notebooks/delete',
                method: 'GET',
                params: {id: stringId}
            },
            commit: {type: 'DELETE_NOTEBOOK_COMMIT', meta: {stringId}},
            rollback: {type: 'DELETE_NOTEBOOK_ROLLBACK', meta: {stringId}}
        }
    }
})

const setNotebookLoading = (isLoading) => ({
    type: NOTEBOOK_LOADING,
    payload: isLoading
})