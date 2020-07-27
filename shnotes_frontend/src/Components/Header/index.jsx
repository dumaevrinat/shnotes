import React, {useContext} from 'react'
import {makeStyles} from "@material-ui/core/styles"
import AppBar from '@material-ui/core/AppBar'
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Context from "../../context"
import {EditOutlined, Share} from "@material-ui/icons"
import Button from "@material-ui/core/Button"
import copy from "copy-to-clipboard"
import Hidden from "@material-ui/core/Hidden"

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        color: 'inherit'
    },
    title: {
        marginRight: theme.spacing(2)
    },
    editButton: {
        color: 'inherit',
        marginRight: theme.spacing(2)
    }
}))

export default function Header({title, notebookUrl}) {
    const classes = useStyles()

    const {toggleMenu, setIsOpenUpdateNotebookDialog} = useContext(Context)

    return (
        <div className={classes.root}>
            <AppBar position="static" color="inherit" elevation={0}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} onClick={() => toggleMenu()}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {title}
                    </Typography>
                    {title &&
                        <Hidden xsDown>
                            <IconButton
                                edge="start"
                                className={classes.editButton}
                                onClick={() => setIsOpenUpdateNotebookDialog(true)}
                            >
                                <EditOutlined/>
                            </IconButton>
                            <Button
                                variant='contained'
                                color='primary'
                                size='small'
                                startIcon={<Share/>}
                                disableElevation
                                onClick={() => copy('localhost:3000' + notebookUrl)}
                            >
                                Скопировать ссылку
                            </Button>
                        </Hidden>
                    }
                </Toolbar>
            </AppBar>
        </div>
    )
}