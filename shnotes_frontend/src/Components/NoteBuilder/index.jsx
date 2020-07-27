import React, {useContext} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import InputBase from "@material-ui/core/InputBase"
import Context from "../../context"

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
    },
}))

export default function NoteBuilder({text}) {
    const classes = useStyles()

    const {setText} = useContext(Context)

    return (
        <InputBase
            className={classes.root}
            placeholder="Текст заметки"
            fullWidth={true}
            value={text}
            multiline
            onInput={(event) => setText(event.target.value)}
        />
    )
}