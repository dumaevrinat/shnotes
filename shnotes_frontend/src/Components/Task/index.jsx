import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Typography from "@material-ui/core/Typography"
import Checkbox from "@material-ui/core/Checkbox"
import {CheckCircle, CheckCircleOutline, HighlightOff} from "@material-ui/icons"
import IconButton from "@material-ui/core/IconButton"
import {useDispatch} from "react-redux"
import {removeTask, updateTask} from "../../actions/taskers"
import clsx from "clsx"

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        alignItems: 'center',
    },
    text: {
        whiteSpace: 'pre-line',
    },
    textDone: {
        textDecoration: 'line-through',
    },
    doneCheckBox: {
        padding: theme.spacing(0.5),
        marginRight: theme.spacing(1),
    },
    deleteButton: {
        padding: theme.spacing(0.5),
        marginRight: theme.spacing(1),
        color: theme.palette.secondary.main
    }
}))

export default function Task({data}) {
    const classes = useStyles()
    const dispatch = useDispatch()

    return (
        <div className={classes.root}>
            <Checkbox
                className={classes.doneCheckBox}
                checked={data.done}
                color='primary'
                icon={<CheckCircleOutline/>}
                checkedIcon={<CheckCircle/>}
                onChange={() => {
                    dispatch(updateTask({...data, done: !data.done}))
                }}
            />

            <IconButton
                className={classes.deleteButton}
                aria-label="Удалить"
                onClick={() => dispatch(removeTask(data.id))}
            >
                <HighlightOff/>
            </IconButton>

            <Typography className={clsx(classes.text, data.done && classes.textDone)}>
                {data.text}
            </Typography>

        </div>
    )
}