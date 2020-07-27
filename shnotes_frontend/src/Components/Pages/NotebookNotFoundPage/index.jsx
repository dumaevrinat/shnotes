import {makeStyles} from "@material-ui/core/styles"
import React from "react"
import Container from "@material-ui/core/Container"
import Grow from "@material-ui/core/Grow"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import {HomeOutlined} from "@material-ui/icons"
import {useHistory} from "react-router-dom"

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

export default function NotebookNotFoundPage() {
    const classes = useStyles()
    const history = useHistory()

    const handleGoHome = () => {
        history.push('/')
    }

    return (
        <div className={classes.root}>
            <Container maxWidth="md">

                <Grow in={true}>
                    <div>
                        <Typography variant="h4" className={classes.title}>
                            Блокнот не найден :(
                        </Typography>
                        <Button
                            className={classes.mainButton}
                            variant="outlined"
                            color="primary"
                            size="large"
                            startIcon={<HomeOutlined/>}
                            onClick={() => handleGoHome()}
                        >
                            Перейти на главную
                        </Button>
                    </div>
                </Grow>
            </Container>
            <div className={classes.animation}></div>
        </div>
    )
}