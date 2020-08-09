import React, {useContext, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import {
    BookOutlined, DeleteOutline, EditOutlined,
    ShareOutlined
} from "@material-ui/icons"
import Context from "../../context"
import {NavLink} from "react-router-dom"
import ListSubheader from "@material-ui/core/ListSubheader"
import {Hidden} from "@material-ui/core"
import copy from "copy-to-clipboard"
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {},
    title: {
        padding: theme.spacing(1)
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        width: 260,
        padding: 0
    },
    itemIconNotebook: {
        color: theme.palette.primary.light
    },
    itemIconTag: {
        color: theme.palette.primary.light
    },
    itemIconChange: {
        color: theme.palette.primary.light
    },
    itemIconDelete: {
        color: theme.palette.secondary.main
    },
    nested: {
        paddingLeft: theme.spacing(4)
    },
    link: {
        textDecoration: "none",
        color: 'inherit',
    }
}))

export default function Menu({isOpenMenu, notebookUrl}) {
    const classes = useStyles()
    const {toggleMenu} = useContext(Context)
    const {
        setIsOpenCreateNotebookDialog,
        setIsOpenDeleteNotebookDialog,
        setIsOpenUpdateNotebookDialog
    } = useContext(Context)

    return (
        <Drawer className={classes.root} transitionDuration={150} open={isOpenMenu} onClose={() => toggleMenu()}>
            <NavLink to={'/'} activeClassName={classes.link}>
                <ListItem button>
                    <Typography variant="h6" className={classes.title}>
                        Shared notes
                    </Typography>
                </ListItem>
            </NavLink>
            <Divider/>
            <List className={classes.list} subheader={<ListSubheader>Общие настройки</ListSubheader>}>
                <ListItem button onClick={() => {
                    setIsOpenCreateNotebookDialog(true)
                    toggleMenu()
                }}>
                    <ListItemIcon className={classes.itemIconNotebook}><BookOutlined/></ListItemIcon>
                    <ListItemText primary='Создать блокнот'/>
                </ListItem>
            </List>
            <List className={classes.list} subheader={<ListSubheader>Настройки текущего блокнота</ListSubheader>}>
                <Hidden smUp>
                    <ListItem button onClick={() => copy('dumaevrinat.github.io/shnotes/#' + notebookUrl)}>
                        <ListItemIcon className={classes.itemIconTag}><ShareOutlined/></ListItemIcon>
                        <ListItemText primary="Скопировать ссылку"/>
                    </ListItem>
                </Hidden>
                <ListItem button onClick={() => setIsOpenUpdateNotebookDialog(true)}>
                    <ListItemIcon className={classes.itemIconChange}><EditOutlined/></ListItemIcon>
                    <ListItemText primary="Изменить блокнот"/>
                </ListItem>
                <ListItem button onClick={() => setIsOpenDeleteNotebookDialog(true)}>
                    <ListItemIcon className={classes.itemIconDelete}><DeleteOutline/></ListItemIcon>
                    <ListItemText primary="Удалить блокнот"/>
                </ListItem>
            </List>
        </Drawer>
    )
}