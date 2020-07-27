import {
    TASKERS_LOADING,
    GET_TASKERS,
    ADD_TASKER,
    DELETE_TASKER,
    ADD_TASK,
    UPDATE_TASK,
    DELETE_TASK, UPDATE_TASKER
} from "./types"
import API from "../api/api"
import {createError} from "./error"

export const getTaskers = (notebookId) => (dispatch) => {
    dispatch(setTaskersLoading(true))
    API
        .get("tasklists/getFullInfo", {
        params: {
            notebookId: notebookId
        }})
        .then((result) => dispatch({
            type: GET_TASKERS,
            payload: result.data
        }))
        .catch(() => {
            dispatch(createError({type: GET_TASKERS}))
            dispatch(setTaskersLoading(false))
        })
}

export const addTasker = (tasker) => (dispatch) => {
    API
        .post("tasklists/add", tasker)
        .then((result) => dispatch({
            type: ADD_TASKER,
            payload: result.data
        }))
        .catch(() => {
            dispatch(createError({type: ADD_TASKER}))
        })
}

export const updateTasker = (newTasker) => (dispatch) => {
    API
        .post("tasklists/update", newTasker)
        .then((result) => dispatch({
            type: UPDATE_TASKER,
            payload: newTasker
        }))
        .catch(() => {
            dispatch(createError({type: UPDATE_TASKER}))
        })
}

export const removeTasker = (id) => (dispatch) => {
    API
        .get("/tasklists/delete", {
        params: {
            taskListId: id
        }})
        .then(() => dispatch({
            type: DELETE_TASKER,
            payload: id
        }))
        .catch(() => {
            dispatch(createError({type: DELETE_TASKER}))
        })
}

export const addTask = (task) => (dispatch) => {
    API
        .post("tasks/add", task)
        .then((result) => dispatch({
            type: ADD_TASK,
            payload: result.data
        }))
        .catch(() => {
            dispatch(createError({type: ADD_TASK}))
        })
}

export const updateTask = (newTask) => (dispatch) => {
    API
        .post("tasks/update", newTask)
        .then(() => dispatch({
            type: UPDATE_TASK,
            payload: newTask
        }))
        .catch(() => {
            dispatch(createError({type: UPDATE_TASK}))
        })
}

export const removeTask = (id) => (dispatch) => {
    API
        .get("tasks/delete", {
        params: {
            taskId: id
        }})
        .then(() => dispatch({
            type: DELETE_TASK,
            payload: id
        }))
        .catch(() => {
            dispatch(createError({type: DELETE_TASK}))
        })
}

const setTaskersLoading = (isLoading) => ({
    type: TASKERS_LOADING,
    payload: isLoading
})