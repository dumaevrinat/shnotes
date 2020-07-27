import React, {useState} from "react"
import Typography from "@material-ui/core/Typography"
import {makeStyles} from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import {ArrowForward} from "@material-ui/icons"
import Button from "@material-ui/core/Button"
import Grow from "@material-ui/core/Grow"
import CreateNotebookDialog from "../../DialogCreateNotebook"
import Context from "../../../context"

import Lottie from 'react-lottie'
import animationData from '../../../lotties/welcome.json'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "space-between",
    },
    title: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4)
    },
    mainButton: {},
    animation: {
        marginTop: theme.spacing(8),
    }
}))

export default function HomePage() {
    const classes = useStyles()

    const [isOpenCreateNotebookDialog, setIsOpenCreateNotebookDialog] = useState(false)

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }

    return (
        <div className={classes.root}>
            <Container maxWidth="md">
                <Context.Provider value={{setIsOpenCreateNotebookDialog}}>

                    <CreateNotebookDialog open={isOpenCreateNotebookDialog}/>

                    <Grow in={true}>
                        <div>
                            <Typography variant="h4" className={classes.title}>
                                Создавайте блокноты с заметками и задачами.
                                Делитесь ими, просто отправив ссылку
                            </Typography>
                            <Button
                                className={classes.mainButton}
                                variant="outlined"
                                color="primary"
                                size="large"
                                startIcon={<ArrowForward/>}
                                onClick={() => setIsOpenCreateNotebookDialog(true)}
                            >
                                Создать блокнот
                            </Button>
                        </div>
                    </Grow>
                </Context.Provider>
            </Container>
            <div className={classes.animation}>
                <Lottie options={defaultOptions} height={550} width={550}/>
            </div>
        </div>
    )
}