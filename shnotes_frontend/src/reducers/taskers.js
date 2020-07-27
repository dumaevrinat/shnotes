import {
    TASKERS_LOADING,
    GET_TASKERS,
    ADD_TASKER,
    DELETE_TASKER,
    ADD_TASK,
    UPDATE_TASK,
    DELETE_TASK, UPDATE_TASKER
} from "../actions/types"

const initialState = {
    taskers: [],
    taskerLoading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case TASKERS_LOADING:
            return {
                ...state,
                taskerLoading: action.payload
            }
        case GET_TASKERS:
            return {
                ...state,
                taskers: action.payload,
                taskerLoading: false
            }
        case ADD_TASKER:
            return {
                ...state,
                taskers: [action.payload, ...state.taskers]
            }
        case UPDATE_TASKER:
            return {
                ...state,
                taskers: state.taskers.map((tasker) => tasker.id === action.payload.id ? action.payload : tasker)
            }
        case DELETE_TASKER:
            return {
                ...state,
                taskers: state.taskers.filter((item) => item.id !== action.payload)
            }
        case ADD_TASK:
            let taskerIndex = state.taskers.findIndex((item) => item.id === action.payload.taskListId)
            const newTaskers = state.taskers.slice()
            newTaskers[taskerIndex].tasks.unshift(action.payload)

            return {
                ...state,
                taskers: newTaskers
            }
        case UPDATE_TASK:
            return {
                ...state,
                taskers: state.taskers.map((tasker) => {
                    return {
                        ...tasker,
                        tasks: tasker.tasks.map((task) => task.id === action.payload.id ? action.payload : task)
                    }
                })
            }
        case DELETE_TASK:
            return {
                ...state,
                taskers: state.taskers.map((tasker) => {
                    return {
                        ...tasker,
                        tasks: tasker.tasks.filter((item) => item.id !== action.payload)
                    }
                })
            }
        default:
            return state
    }
}