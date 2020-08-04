import React, {useContext} from 'react'
import {makeStyles} from "@material-ui/core/styles"
import AppBar from '@material-ui/core/AppBar'
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Context from "../../context"
import {EditOutlined, Share, Sync, SyncDisabled} from "@material-ui/icons"
import Button from "@material-ui/core/Button"
import copy from "copy-to-clipboard"
import Hidden from "@material-ui/core/Hidden"
import {useSelector} from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
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
    },
    status: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: "auto",
        marginTop: "auto",
        marginBottom: "auto"
    }
}))

export default function Header({title, notebookUrl}) {
    const classes = useStyles()

    const {toggleMenu, setIsOpenUpdateNotebookDialog} = useContext(Context)
    const status = useSelector(state => state.offline.online)

    return (
        <AppBar position="static" color="inherit" elevation={0}>
            <Toolbar className={classes.root}>
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
                            onClick={() => copy('dumaevrinat.github.io/shnotes/#' + notebookUrl)}
                        >
                            Скопировать ссылку
                        </Button>
                    </Hidden>
                    }
                <div className={classes.status}>
                    {status ?
                        <Tooltip title="В сети"><Sync/></Tooltip> :
                        <Tooltip title="Не в сети"><SyncDisabled/></Tooltip>
                    }
                </div>
            </Toolbar>
        </AppBar>
    )
}