import React from 'react';
import { AppBar, Toolbar, Button, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

//AppBar sample code from https://material-ui.com/components/app-bar/
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar({ loggedIn }) {
  const classes = useStyles();
  const log = loggedIn ? "Log Out" : "Login";

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton 
          edge="start" 
          className={classes.menuButton} 
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>TaskIt</Typography>


        <Button color="inherit"><a href="/createTask">Create Task</a></Button>


        <Button color="inherit"><a href="/login">{log}</a></Button>
      </Toolbar>
    </AppBar>
  );
}
