import React, {useContext, useState} from "react"
import { useHistory } from "react-router-dom"

import {makeStyles} from "@material-ui/core/styles"
import Dialog from "@material-ui/core/Dialog"
import Context from "../../context"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogActions from "@material-ui/core/DialogActions"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import API from "../../api/api"


const useStyles = makeStyles((theme) => ({
    root: {
    }
}))

export default function CreateNotebookDialog({open}) {
    const classes = useStyles()
    const history = useHistory()

    const {setIsOpenCreateNotebookDialog}= useContext(Context)

    const [notebookName, setNotebookName] = useState('')

    const handleCreateNotebook = () => {
        const notebook = {
            name: notebookName
        }

        API
            .post("notebooks/add", notebook)
            .then((result) => {
                history.push(`/notebook/${result.data}`)
            })
            .catch(() => {
            })

        setIsOpenCreateNotebookDialog(false)
    }

    return (
        <Dialog
            className={classes.root}
            open={open}
            onClose={() => setIsOpenCreateNotebookDialog(false)}
        >
            <DialogTitle>Создать новый блокнот</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Введите название блокнота, который хотите создать
                </DialogContentText>
                <TextField
                    autoFocus
                    fullWidth
                    label="Название блокнота"
                    type="text"
                    value={notebookName}
                    onInput={(event) => setNotebookName(event.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setIsOpenCreateNotebookDialog(false)} color="primary">
                    Назад
                </Button>
                <Button onClick={() => handleCreateNotebook()} color="primary">
                    Создать
                </Button>
            </DialogActions>
        </Dialog>
    )
}