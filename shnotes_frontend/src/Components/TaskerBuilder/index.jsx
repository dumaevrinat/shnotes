import React, {useContext} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import InputBase from "@material-ui/core/InputBase"
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from "@material-ui/core/IconButton"
import {Add, CheckCircle, CheckCircleOutline, HighlightOff} from "@material-ui/icons"
import Context from "../../context"
import Checkbox from "@material-ui/core/Checkbox"

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    task: {
        display: "flex",
        alignItems: 'center',
        width: '100%',
    },
    text: {
    },
    doneCheckBox: {
        padding: theme.spacing(0.5),
        marginRight: theme.spacing(1),
    },
    deleteButton: {
        padding: theme.spacing(0.5),
        marginRight: theme.spacing(1),
        color: theme.palette.secondary.main
    },
}))

export default function TaskerBuilder({tasker}) {
    const classes = useStyles()

    const {setTasker} = useContext(Context)

    const updateTask = (index, newTask) => {
        const newTaskListsData = tasker.slice()
        newTaskListsData[index] = newTask

        setTasker(newTaskListsData)
    }

    const deleteTask = (index) => {
        const newTaskListsData = tasker.slice()
        newTaskListsData.splice(index, 1)
        setTasker(newTaskListsData)
    }

    const addNewTask = () => {
        const newTaskListsData = tasker.slice()
        newTaskListsData.push({
            done: false,
            text: ""
        })
        setTasker(newTaskListsData)
    }

    const handleKeyDown = (event, taskIndex) => {
        switch (event.key) {
            case 'Enter':
                addNewTask()
                break
            case 'Backspace':
                if (tasker.length !== 1 && tasker[taskIndex].text === '') {
                    deleteTask(taskIndex)
                }
                break
            default:
                break
        }
    }

    return (
        <div className={classes.root}>
            {tasker.map((task, index) =>
                <div className={classes.task} key={index}>
                    <Checkbox
                        className={classes.doneCheckBox}
                        checked={task.done}
                        color='primary'
                        icon={<CheckCircleOutline/>}
                        checkedIcon={<CheckCircle/>}
                        onChange={() => {
                            updateTask(index, {...task, done: !task.done})
                        }}
                    />

                    {tasker.length !== 1 && <Tooltip title="Удалить">
                        <IconButton
                            className={classes.deleteButton}
                            aria-label="Удалить"
                            size='small'
                            onClick={() => deleteTask(index)}
                        >
                            <HighlightOff/>
                        </IconButton>
                    </Tooltip>}

                    <InputBase
                        className={classes.text}
                        placeholder="Текст задачи"
                        fullWidth={true}
                        value={task.text}
                        autoFocus={true}
                        multiline={false}
                        onInput={(event) => updateTask(index, {...task, text: event.target.value})}
                        onKeyDown={(event) => handleKeyDown(event, index)}
                    />
                </div>
            )}

            <IconButton
                color="primary"
                aria-label="Добавить задачу"
                onClick={() => addNewTask()}
            >
                <Add/>
            </IconButton>
        </div>
    )
}