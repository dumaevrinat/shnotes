import {makeStyles} from "@material-ui/core/styles"
import {useHistory} from "react-router-dom"
import React, {useContext} from "react"
import Context from "../../context"
import API from "../../api/api"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogActions from "@material-ui/core/DialogActions"
import Button from "@material-ui/core/Button"
import {useSelector} from "react-redux"

const useStyles = makeStyles((theme) => ({
    root: {
    }
}))

export default function DeleteNotebookDialog({open}) {
    const classes = useStyles()
    const history = useHistory()

    const {setIsOpenDeleteNotebookDialog}= useContext(Context)
    const stringId = useSelector(state => state.notebook.notebook.id)

    const handleDeleteNotebook = () => {
        API
            .get("notebooks/delete", {
                params: {
                    notebookId: stringId
                }
            })
            .then(() => {
                history.push(`/`)
            })
            .catch(() => {
            })

        setIsOpenDeleteNotebookDialog(false)
    }

    return (
        <Dialog
            className={classes.root}
            open={open}
            onClose={() => setIsOpenDeleteNotebookDialog(false)}
        >
            <DialogTitle>Удалить блокнот</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Удалить блокнот?
                </DialogContentText>

            </DialogContent>
            <DialogActions>
                <Button onClick={() => setIsOpenDeleteNotebookDialog(false)} color="primary">
                    Назад
                </Button>
                <Button onClick={() => handleDeleteNotebook()} color="primary">
                    Удалить
                </Button>
            </DialogActions>
        </Dialog>
    )
}