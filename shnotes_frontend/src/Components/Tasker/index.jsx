import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import Task from "../Task"
import CardActions from "@material-ui/core/CardActions"
import Tooltip from "@material-ui/core/Tooltip"
import {Close, Star, StarBorder} from "@material-ui/icons"
import IconButton from "@material-ui/core/IconButton"
import {useDispatch} from "react-redux"
import {removeTasker, updateTasker} from "../../actions/taskers"
import Fade from "@material-ui/core/Fade"
import Grow from "@material-ui/core/Grow"
import clsx from "clsx"
import Checkbox from "@material-ui/core/Checkbox"

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(1),
    },
    title: {
        marginBottom: theme.spacing(2),
    },
    content: {
        paddingBottom: 0,
    },
    actions: {
        paddingTop: 0,
        paddingRight: theme.spacing(2),
        display: 'flex',
        justifyContent: "space-between",
    },
    priority: {
        borderColor: theme.palette.secondary.light,
    },
}))

export default function Tasker({data}) {
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

                    {data.tasks.map((task) => <Task data={task} key={task.id}/>)}
                </CardContent>

                <Fade in={expanded}>
                    <CardActions className={classes.actions}>
                        <div/>
                        <div>
                            <Tooltip title={data.highPriority ? "Высокий приоритет" : "Средний приоритет"}>
                                <Checkbox
                                    checked={data.highPriority}
                                    size='small'
                                    icon={<StarBorder/>}
                                    checkedIcon={<Star/>}
                                    onChange={() => {
                                        dispatch(updateTasker({...data, highPriority: !data.highPriority}))
                                    }}
                                />
                            </Tooltip>
                            <Tooltip title="Удалить">
                                <IconButton aria-label="Удалить" size='small'
                                            onClick={() => dispatch(removeTasker(data.id))}>
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