import React, {useState} from 'react'
import {makeStyles} from "@material-ui/core/styles"
import IconButton from '@material-ui/core/IconButton'
import Context from "../../context"
import Card from "@material-ui/core/Card"
import clsx from "clsx"
import CardContent from "@material-ui/core/CardContent"
import InputBase from "@material-ui/core/InputBase"
import CardActions from "@material-ui/core/CardActions"
import Tooltip from "@material-ui/core/Tooltip"
import Checkbox from "@material-ui/core/Checkbox"
import {Add, Assignment, AssignmentTurnedIn, Star, StarBorder} from "@material-ui/icons"
import Button from "@material-ui/core/Button"
import NoteBuilder from "../NoteBuilder"
import TaskerBuilder from "../TaskerBuilder"

import {addNote} from '../../actions/notes'
import {useDispatch} from "react-redux"
import {addTasker} from "../../actions/taskers"
import Grow from "@material-ui/core/Grow"

import {v4 as uuidv4} from 'uuid'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
    },
    inputTitle: {
        height: theme.typography.h6.fontSize,
        fontSize: theme.typography.h6.fontSize,
        fontWeight: theme.typography.h6.fontWeight,
    },
    actions: {
        padding: theme.spacing(2),
        display: 'flex',
        justifyContent: 'space-between',
    },
    priority: {
        borderColor: theme.palette.secondary.light,
    },
    tools: {},
}))

export default function Builder({notebookStringId}) {
    const classes = useStyles()
    const dispatch = useDispatch()

    const [isTasker, setIsTasker] = useState(false)
    const [title, setTitle] = useState('')

    const [noteData, setNoteData] = useState('')
    const [taskerData, setTaskerData] = useState([{
        id: uuidv4(),
        done: false,
        text: ""
    }])

    const [highPriority, setHighPriority] = useState(false)

    const handleAddButton = () => {
        if (isTasker) {
            dispatch(addTasker({
                id: uuidv4(),
                notebookId: notebookStringId,
                title: title,
                tasks: taskerData,
                highPriority: highPriority
            }))

            setTitle('')
            setTaskerData([{
                done: false,
                text: ""
            }])
        } else {
            dispatch(addNote({
                id: uuidv4(),
                done: false,
                notebookId: notebookStringId,
                text: noteData,
                title: title,
                highPriority: highPriority
            }))

            setTitle('')
            setNoteData('')
            setHighPriority(false)
        }
    }

    return (
        <Grow in={true}>
            <Card className={clsx(classes.root, highPriority && classes.priority)} variant='outlined'>
                <CardContent>
                    <InputBase
                        className={classes.inputTitle}
                        placeholder="Заголовок"
                        fullWidth={true}
                        value={title}
                        multiline
                        onInput={(event) => setTitle(event.target.value)}
                    />
                    <Context.Provider value={{setText: setNoteData, setTasker: setTaskerData}}>
                        {isTasker ? <TaskerBuilder tasker={taskerData}/> : <NoteBuilder text={noteData}/>}
                    </Context.Provider>
                </CardContent>
                <CardActions className={classes.actions}>
                    <div className={classes.tools}>
                        <Tooltip title={highPriority ? "Высокий приоритет" : "Средний приоритет"}>
                            <Checkbox
                                checked={highPriority}
                                icon={<StarBorder/>}
                                checkedIcon={<Star/>}
                                onChange={() => {
                                    setHighPriority(!highPriority)
                                }}
                            />
                        </Tooltip>
                        <Tooltip title={isTasker ? "Список задач" : "Заметка"}>
                            <IconButton
                                aria-label={isTasker ? "Список задач" : "Заметка"}
                                onClick={() => setIsTasker(!isTasker)}
                            >
                                {isTasker ? <AssignmentTurnedIn/> : <Assignment/>}
                            </IconButton>
                        </Tooltip>
                    </div>
                    <Button
                        variant='outlined'
                        color={highPriority ? "secondary" : "primary"}
                        startIcon={<Add/>}
                        disableElevation
                        onClick={() => handleAddButton()}
                    >
                        Добавить
                    </Button>
                </CardActions>
            </Card>
        </Grow>
    )
}