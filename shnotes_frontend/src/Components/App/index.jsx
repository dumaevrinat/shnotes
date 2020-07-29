import React from 'react'
import {Route, Switch} from 'react-router-dom'
import HomePage from "../Pages/HomePage"
import NotebookPage from "../Pages/NotebookPage"
import {createMuiTheme, responsiveFontSizes} from "@material-ui/core"
import {ThemeProvider} from "@material-ui/styles"
import NotebookNotFoundPage from "../Pages/NotebookNotFoundPage"

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#9778ce',
            main: '#7e57c2',
        },
        secondary: {
            light: '#ff8a80',
            main: '#ff8a80',
        },
    },
})

export default function App() {

    return (
        <ThemeProvider theme={responsiveFontSizes(theme)}>
                <div className="App">
                    <Switch>
                        <Route exact path='/' component={HomePage}/>
                        <Route path='/notebook/:stringId' component={NotebookPage}/>
                        <Route path='/notebooknotfound' component={NotebookNotFoundPage}/>
                    </Switch>
                </div>
        </ThemeProvider>
    )
}
