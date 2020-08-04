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

export const addTasker = (tasker) => ({
    type: ADD_TASKER,
    payload: tasker,
    meta: {
        offline: {
            effect: {
                url: 'https://dumaev.digital/api/v1/tasklists/add',
                method: 'POST',
                data: tasker
            },
            commit: {type: 'ADD_TASKER_COMMIT', meta: {tasker}},
            rollback: {type: 'ADD_TASKER_ROLLBACK', meta: {tasker}}
        }
    }
})

export const updateTasker = (newTasker) => ({
    type: UPDATE_TASKER,
    payload: newTasker,
    meta: {
        offline: {
            effect: {
                url: 'https://dumaev.digital/api/v1/tasklists/update',
                method: 'POST',
                data: newTasker
            },
            commit: {type: 'UPDATE_TASKER_COMMIT', meta: {newTasker}},
            rollback: {type: 'UPDATE_TASKER_ROLLBACK', meta: {newTasker}}
        }
    }
})

export const removeTasker = (id) => ({
    type: DELETE_TASKER,
    payload: id,
    meta: {
        offline: {
            effect: {
                url: 'https://dumaev.digital/api/v1/tasklists/delete',
                method: 'GET',
                params: {
                    taskListId: id
                }
            },
            commit: {type: 'DELETE_TASKER_COMMIT', meta: {id}},
            rollback: {type: 'DELETE_TASKER_ROLLBACK', meta: {id}}
        }
    }
})

export const addTask = (task) => ({
    type: ADD_TASK,
    payload: task,
    meta: {
        offline: {
            effect: {
                url: 'https://dumaev.digital/api/v1/tasks/add',
                method: 'POST',
                data: task
            },
            commit: {type: 'ADD_TASK_COMMIT', meta: {task}},
            rollback: {type: 'ADD_TASK_ROLLBACK', meta: {task}}
        }
    }
})

export const updateTask = (newTask) => ({
    type: UPDATE_TASK,
    payload: newTask,
    meta: {
        offline: {
            effect: {
                url: 'https://dumaev.digital/api/v1/tasks/update',
                method: 'POST',
                data: newTask
            },
            commit: {type: 'UPDATE_TASK_COMMIT', meta: {newTask}},
            rollback: {type: 'UPDATE_TASK_ROLLBACK', meta: {newTask}}
        }
    }
})

export const removeTask = (id) => ({
    type: DELETE_TASK,
    payload: id,
    meta: {
        offline: {
            effect: {
                url: 'https://dumaev.digital/api/v1/tasks/delete',
                method: 'GET',
                params: {
                    taskId: id
                }
            },
            commit: {type: 'DELETE_TASK_COMMIT', meta: {id}},
            rollback: {type: 'DELETE_TASK_ROLLBACK', meta: {id}}
        }
    }
})

const setTaskersLoading = (isLoading) => ({
    type: TASKERS_LOADING,
    payload: isLoading
})