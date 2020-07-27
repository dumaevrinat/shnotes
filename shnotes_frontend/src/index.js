import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {HashRouter} from 'react-router-dom'
import App from "./Components/App"

import {Provider} from 'react-redux'

import store from './store'

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <App/>
        </HashRouter>
    </Provider>,
    document.getElementById('root')
)