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
            light: '#7c4dff',
            main: '#7c4dff',
        },
        secondary: {
            light: '#ff4081',
            main: '#ff4081',
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
