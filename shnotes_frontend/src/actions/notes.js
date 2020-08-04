import API from '../api/api'

import {
    NOTES_LOADING,
    ADD_NOTE,
    DELETE_NOTE,
    UPDATE_NOTE,
    GET_NOTES
} from './types'
import {createError} from "./error"

export const getNotes = (notebookId) => (dispatch) => {
    dispatch(setNotesLoading(true))
    API
        .get("notes/get", {
        params: {
            notebookId: notebookId,
        }})
        .then((result) => dispatch({
            type: GET_NOTES,
            payload: result.data
        }))
        .catch((error) => {
            dispatch(setNotesLoading(false))
            dispatch(createError({type: GET_NOTES}))
        })
}

export const addNote = (note) => ({
    type: ADD_NOTE,
    payload: note,
    meta: {
        offline: {
            effect: {
                url: 'https://dumaev.digital/api/v1/notes/add',
                method: 'POST',
                data: note
            },
            commit: {type: 'ADD_NOTE_COMMIT', meta: {note}},
            rollback: {type: 'ADD_NOTE_ROLLBACK', meta: {note}}
        }
    }
})

export const removeNote = (id) => ({
    type: DELETE_NOTE,
    payload: id,
    meta: {
        offline: {
            effect: {
                url: 'https://dumaev.digital/api/v1/notes/delete',
                method: 'GET',
                params: {noteId: id}
            },
            commit: {type: 'DELETE_NOTE_COMMIT', meta: {id}},
            rollback: {type: 'DELETE_NOTE_ROLLBACK', meta: {id}}
        }
    }
})

export const updateNote = (newNote) => ({
    type: UPDATE_NOTE,
    payload: newNote,
    meta: {
        offline: {
            effect: {
                url: 'https://dumaev.digital/api/v1/notes/update',
                method: 'POST',
                data: newNote
            },
            commit: {type: 'UPDATE_NOTE_COMMIT', meta: {newNote}},
            rollback: {type: 'UPDATE_NOTE_ROLLBACK', meta: {newNote}}
        }
    }
})

const setNotesLoading = (isLoading) => ({
    type: NOTES_LOADING,
    payload: isLoading
})
