import {
    ADD_NOTE,
    ADD_TASK,
    ADD_TASKER, CREATE_NOTEBOOK,
    DELETE_NOTE, DELETE_NOTEBOOK, DELETE_TASK,
    DELETE_TASKER, GET_NOTEBOOK,
    GET_NOTES,
    GET_TASKERS,
    UPDATE_NOTE, UPDATE_NOTEBOOK, UPDATE_TASK, UPDATE_TASKER
} from "../actions/types"

export const getErrorMessageByType = (type) => {
    switch (type) {
        case ADD_NOTE:
            return 'Не удалось добавить заметку'
        case DELETE_NOTE:
            return 'Не удалось удалить заметку'
        case UPDATE_NOTE:
            return 'Не удалось обновить заметку'
        case GET_NOTES:
            return 'Не удалось получить заметки'
        case GET_TASKERS:
            return 'Не удалось получить списки задач'
        case ADD_TASKER:
            return 'Не удалось добавить список задач'
        case DELETE_TASKER:
            return 'Не удалось удалить список задач'
        case UPDATE_TASKER:
            return 'Не удалось обновить список задач'
        case ADD_TASK:
            return 'Не удалось добавить задачу'
        case UPDATE_TASK:
            return 'Не удалось обновить задачу'
        case DELETE_TASK:
            return 'Не удалось удалить задачу'
        case GET_NOTEBOOK:
            return 'Не удалось получить блокнот'
        case CREATE_NOTEBOOK:
            return 'Не удалось создать блокнот'
        case DELETE_NOTEBOOK:
            return 'Не удалось удалить блокнот'
        case UPDATE_NOTEBOOK:
            return 'Не удалось обновить блокнот'
        default:
            return 'Ошибка'

    }
}
