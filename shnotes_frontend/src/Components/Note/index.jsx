import React, {useState} from 'react'
import {makeStyles} from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Typography from "@material-ui/core/Typography"
import Checkbox from "@material-ui/core/Checkbox"
import {Close, Star, StarBorder} from "@material-ui/icons"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import clsx from "clsx"
import {useDispatch} from "react-redux"

import {updateNote, removeNote} from "../../actions/notes"
import Fade from "@material-ui/core/Fade"
import Grow from "@material-ui/core/Grow"


const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(1),
    },
    content: {
        paddingBottom: 0,
    },
    actions: {
        paddingTop: 0,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        display: 'flex',
        justifyContent: "space-between",
    },
    title: {
        marginBottom: theme.spacing(2),
    },
    text: {
        whiteSpace: 'pre-line',
    },
    priority: {
        borderColor: theme.palette.secondary.light,
    },
}))

export default function Note({data}) {
    const classes = useStyles()
    const dispatch = useDispatch()

    const [expanded, setExpanded] = useState(false)

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }


    return (
        <Grow in={true}>
            <Card
                className={clsx(classes.root, data.highPriority && classes.priority)}
                variant="outlined"
                onMouseOver={() => handleExpandClick()}
                onMouseOut={() => handleExpandClick()}
            >
                <CardContent className={classes.content}>
                    <Typography variant='h6' className={classes.title}>
                        {data.title}
                    </Typography>
                    <Typography className={classes.text}>
                        {data.text}
                    </Typography>
                </CardContent>
                <Fade in={expanded}>
                    <CardActions className={classes.actions}>
                        <div/>
                        <div>
                            <Tooltip title={data.highPriority ? "Высокий приоритет" : "Средний приоритет"}>
                                <Checkbox
                                    checked={data.highPriority}
                                    size="small"
                                    icon={<StarBorder/>}
                                    checkedIcon={<Star/>}
                                    onChange={() => {
                                        dispatch(updateNote({...data, highPriority: !data.highPriority}))
                                    }}
                                />
                            </Tooltip>
                            <Tooltip title={data.done ? "Выполнено" : "Не выполнено"}>
                                <Checkbox
                                    checked={data.done}
                                    size="small"
                                    color='primary'
                                    onChange={() => {
                                        dispatch(updateNote({...data, done: !data.done}))
                                    }}
                                />
                            </Tooltip>
                            <Tooltip title="Удалить">
                                <IconButton aria-label="Удалить" size="small" onClick={() => {
                                    dispatch(removeNote(data.id))
                                }}>
                                    <Close/>
                                </IconButton>
                            </Tooltip>
                        </div>
                    </CardActions>
                </Fade>
            </Card>
        </Grow>
    )
}