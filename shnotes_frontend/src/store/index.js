import {applyMiddleware, createStore, compose} from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'
import { offline } from "redux-offline"
import config  from "redux-offline/lib/defaults"
import axios from "axios";

const effect = (effect, action) => axios(effect)

const discard = (error, _action, _retries) => {
    const { request, response } = error

    if (!request) throw error
    if (!response) return false

    return 400 <= response.status && response.status < 500
};

const customConfig = {
    ...config,
    effect,
    discard
}

export default createStore(rootReducer, compose(applyMiddleware(thunk), offline(customConfig)))
