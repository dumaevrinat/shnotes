import React, {useState, useEffect} from "react"
import Container from '@material-ui/core/Container'
import Snackbar from '@material-ui/core/Snackbar'
import Note from "../../Note"
import CircularProgress from '@material-ui/core/CircularProgress'
import {makeStyles} from "@material-ui/core/styles"
import Context from "../../../context"
import Tasker from "../../Tasker"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import clsx from "clsx"
import Collapse from "@material-ui/core/Collapse"
import Builder from "../../Builder"

import {useSelector, useDispatch} from "react-redux"
import {getNotes} from '../../../actions/notes'
import {getTaskers} from "../../../actions/taskers"
import {getNotebook} from "../../../actions/notebook"
import Menu from "../../Menu"
import Header from "../../Header"
import CreateNotebookDialog from "../../DialogCreateNotebook"
import {setHasError} from "../../../actions/error"
import UpdateNotebookDialog from "../../DialogUpdateNotebook"
import Divider from "@material-ui/core/Divider"
import DeleteNotebookDialog from "../../DialogDeleteNotebook"
import {getErrorMessageByType} from "../../../utils/getErrorMessage"
import {GET_NOTEBOOK} from "../../../actions/types"
import {useHistory} from "react-router-dom"

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',

    },
    progressBar: {
        marginTop: theme.spacing(2),
        color: theme.palette.primary.light,
    },
    title: {
        marginTop: theme.spacing(1),
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    }
}))

export default function NotebookPage(props) {
    const classes = useStyles()
    const dispatch = useDispatch()

    const history = useHistory()

    const [expandedNotes, setExpandedNotes] = useState(true)
    const [expandedTaskLists, setExpandedTaskLists] = useState(true)

    const hasError = useSelector(state => state.error.hasError)
    const error = useSelector(state => state.error.error)

    const title = useSelector(state => state.notebook.notebook.name)

    const notes = useSelector(state => state.notes.notes)
    const taskers = useSelector(state => state.taskers.taskers)

    const isLoadingNotes = useSelector(state => state.notes.noteLoading)
    const isLoadingTaskers = useSelector(state => state.taskers.taskerLoading)

    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const [isOpenCreateNotebookDialog, setIsOpenCreateNotebookDialog] = useState(false)
    const [isOpenUpdateNotebookDialog, setIsOpenUpdateNotebookDialog] = useState(false)
    const [isOpenDeleteNotebookDialog, setIsOpenDeleteNotebookDialog] = useState(false)

    const toggleMenu = () => {
        setIsOpenMenu(!isOpenMenu)
    }

    const closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        dispatch(setHasError(false))
    }

    useEffect(() => {
        dispatch(getNotebook(props.match.params.stringId))
        dispatch(getNotes(props.match.params.stringId))
        dispatch(getTaskers(props.match.params.stringId))
    }, [dispatch, props.match.params.stringId])

    useEffect(() => {
        if (hasError && error.type === GET_NOTEBOOK && error.code === 400) {
            setHasError(false)

            history.push('/notebooknotfound')
        }
    }, [error])

    return (
        <Context.Provider value={{
            toggleMenu,
            setIsOpenCreateNotebookDialog,
            setIsOpenUpdateNotebookDialog,
            setIsOpenDeleteNotebookDialog
        }}>
            <Menu isOpenMenu={isOpenMenu} notebookUrl={props.location.pathname}/>
            <Header title={title} notebookUrl={props.location.pathname}/>
            <Divider/>

            <CreateNotebookDialog open={isOpenCreateNotebookDialog}/>
            <UpdateNotebookDialog open={isOpenUpdateNotebookDialog}/>
            <DeleteNotebookDialog open={isOpenDeleteNotebookDialog}/>

            <Container className={classes.root} maxWidth="md">
                <Builder notebookStringId={props.match.params.stringId}/>

                <div className={classes.title}>
                    <Typography variant='overline'>
                        Списки задач
                    </Typography>

                    <IconButton
                        className={clsx(classes.expand, expandedTaskLists && classes.expandOpen)}
                        onClick={() => setExpandedTaskLists(!expandedTaskLists)}
                        size='small'
                    >
                        <ExpandMoreIcon/>
                    </IconButton>
                </div>

                <Collapse in={expandedTaskLists} timeout="auto">
                    {isLoadingTaskers && <CircularProgress className={classes.progressBar}/>}
                    <div className={classes.taskers}>
                        {!isLoadingTaskers && taskers.map((tasker) => <Tasker data={tasker} key={tasker.id}/>)}
                    </div>
                </Collapse>

                <div className={classes.title}>
                    <Typography variant='overline' className={classes.title}>
                        Заметки
                    </Typography>

                    <IconButton
                        className={clsx(classes.expand, expandedNotes && classes.expandOpen)}
                        onClick={() => setExpandedNotes(!expandedNotes)}
                        size='small'
                    >
                        <ExpandMoreIcon/>
                    </IconButton>
                </div>

                <Collapse in={expandedNotes} timeout="auto">
                    {isLoadingNotes && <CircularProgress className={classes.progressBar}/>}
                    {!isLoadingNotes && notes.map((note) => <Note data={note} key={note.id}/>)}

                </Collapse>

                <Snackbar
                    anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                    autoHideDuration={2000}
                    open={hasError}
                    message={getErrorMessageByType(error.type)}
                    onClose={closeSnackbar}
                />
            </Container>
        </Context.Provider>
    )
}