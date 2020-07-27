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

export const addNote = (note) => (dispatch) => {
    API
        .post("notes/add", note)
        .then((result) => dispatch({
            type: ADD_NOTE,
            payload: result.data
        }))
        .catch((error) => {
            dispatch(createError({type: ADD_NOTE}))
        })
}

export const removeNote = (id) => (dispatch) => {
    API
        .get("notes/delete", {
            params: {
                noteId: id
            }
        })
        .then(() => dispatch({
            type: DELETE_NOTE,
            payload: id
        }))
        .catch((error) => {
            dispatch(createError({type: DELETE_NOTE}))
        })
}

export const updateNote = (newNote) => (dispatch) => {
    API
        .post("notes/update", newNote)
        .then(() => dispatch({
            type: UPDATE_NOTE,
            payload: newNote
        }))
        .catch((error) => {
            dispatch(createError({type: UPDATE_NOTE}))
        })
}

const setNotesLoading = (isLoading) => ({
    type: NOTES_LOADING,
    payload: isLoading
})
