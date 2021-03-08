import React from 'react';
import { AppBar, Toolbar, Button, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from "@material-ui/core/MenuItem"
import { Menu } from '@material-ui/core';
import { useState } from 'react';

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
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (e) =>{
    setOpen(!open)
    setAnchorEl(document.querySelector('header'))
  }
  const handleClose = () => {
    setOpen(!open)
    setAnchorEl(null)
  }
  

  return (
    <AppBar position="fixed">
      <Toolbar>
      <IconButton edge="false" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon onClick={(e)=>handleClick(e)}/>
        </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}><a href="/edit_profile">Profile</a></MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
       
      </Menu>
        <Typography variant="h6" className={classes.title}>TaskIt</Typography>
        
        <Button color="inherit"><a href="/dashboard">Dashboard</a></Button>
        <Button color="inherit"><a href="/company_profile">Company Profile</a></Button>
        <Button color="inherit"><a href="/create_task">Create Task</a></Button>


        <Button color="inherit"><a href="/login">{log}</a></Button>
        <Button color="inherit"><a href="/registeration">Sign Up</a></Button>
      </Toolbar>
    </AppBar>
  );
}
