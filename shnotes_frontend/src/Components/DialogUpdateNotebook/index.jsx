import {makeStyles} from "@material-ui/core/styles"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import TextField from "@material-ui/core/TextField"
import DialogActions from "@material-ui/core/DialogActions"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import React, {useContext, useEffect, useState} from "react"
import Context from "../../context"
import {useDispatch, useSelector} from "react-redux"
import {updateNotebookName} from "../../actions/notebook"

const useStyles = makeStyles((theme) => ({
    root: {
    }
}))

export default function UpdateNotebookDialog({open}) {
    const classes = useStyles()

    const dispatch = useDispatch()

    const {setIsOpenUpdateNotebookDialog}= useContext(Context)
    const notebookName = useSelector(state => state.notebook.notebook.name)
    const stringId = useSelector(state => state.notebook.notebook.stringId)

    const [notebookNameTextField, setNotebookNameTextField] = useState(notebookName)

    const handleUpdateNotebook = () => {
        dispatch(updateNotebookName(stringId, notebookNameTextField))
        setIsOpenUpdateNotebookDialog(false)
    }

    useEffect(() => {
        setNotebookNameTextField(notebookName)
    }, [notebookName])

    return (
        <Dialog
            className={classes.root}
            open={open}
            onClose={() => setIsOpenUpdateNotebookDialog(false)}
        >
            <DialogTitle>Изменить блокнот</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Введите новое название блокнота
                </DialogContentText>
                <TextField
                    autoFocus
                    fullWidth
                    label="Название блокнота"
                    type="text"
                    value={notebookNameTextField}
                    onInput={(event) => setNotebookNameTextField(event.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setIsOpenUpdateNotebookDialog(false)} color="primary">
                    Назад
                </Button>
                <Button onClick={() => handleUpdateNotebook()} color="primary">
                    Изменить
                </Button>
            </DialogActions>
        </Dialog>
    )

}