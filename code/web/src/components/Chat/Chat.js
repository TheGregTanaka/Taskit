import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Button from "@material-ui/core/Button";

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import SendIcon from '@material-ui/icons/Send';

import './style.css';

import socketIOClient from 'socket.io-client';



const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(56, 56, 56, 0.95)'
    },
    content : {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
    }
};

const friends = [
    {
        key: 1,
        name: "1. Firstname Lastname",
        img: "https://material-ui.com/static/images/avatar/1.jpg"
    },
    {
        key: 2,
        name: "2. Firstname Lastname",
        img: "https://material-ui.com/static/images/avatar/2.jpg"
    },
    {
        key: 3,
        name: "3. Firstname Lastname",
        img: "https://material-ui.com/static/images/avatar/3.jpg"
    },{
        key: 4,
        name: "4. Firstname Lastname",
        img: "https://material-ui.com/static/images/avatar/4.jpg"
    },
    {
        key: 5,
        name: "5. Firstname Lastname",
        img: "https://material-ui.com/static/images/avatar/5.jpg"
    },
    {
        key: 6,
        name: "6. Firstname Lastname",
        img: "https://material-ui.com/static/images/avatar/6.jpg"
    },
    {
        key: 7,
        name: "7. Firstname Lastname",
        img: "https://material-ui.com/static/images/avatar/7.jpg"
    },
    {
        key: 8,
        name: "7. Firstname Lastname",
        img: "https://material-ui.com/static/images/avatar/7.jpg"
    },
    {
        key: 9,
        name: "7. Firstname Lastname",
        img: "https://material-ui.com/static/images/avatar/7.jpg"
    },
    {
        key: 10,
        name: "7. Firstname Lastname",
        img: "https://material-ui.com/static/images/avatar/7.jpg"
    },
    {
        key: 11,
        name: "7. Firstname Lastname",
        img: "https://material-ui.com/static/images/avatar/7.jpg"
    },
];

const Chat = () => {
    const [modalIsOpen,setModalIsOpen] = useState(false);
    const setModalIsOpenToTrue =()=>{
        setModalIsOpen(true)
    }
    const setModalIsOpenToFalse =()=>{
        setModalIsOpen(false);
    }

    // const [response, setResponse] = useState("");

    //     useEffect(() => {
    //         const socket = socketIOClient("http://127.0.0.1:4001");
    //         socket.on("FromAPI", data => {
    //         setResponse(data);
    //         });
    //         return () => socket.disconnect();
    //     }, []);

    return (
        <>
            <Button size="small" color="primary" onClick={setModalIsOpenToTrue}>
                <Typography style={{color:"#ffab40"}}>Message</Typography>
            </Button>


            <Modal isOpen={modalIsOpen} style={customStyles} ariaHideApp={false} onRequestClose={()=> setModalIsOpen(false)}>
                <div style={{ width:"85vw", height:"100%"}}>
                    <Grid container>
                        <Grid item xs={2} component={Paper}>
                            <List>
                                <ListItem>
                                    <ListItemIcon>
                                        <Avatar alt="user_pic" src="https://material-ui.com/static/images/avatar/1.jpg" />
                                    </ListItemIcon>
                                    <ListItemText id="drop-labels" primary={<Typography variant="h5">Chats</Typography>}></ListItemText>
                                </ListItem>
                            </List>

                            <Divider />
                            
                            <Grid item id="drop-labels">
                                <br/>   
                                <TextField label="Search" variant="outlined" type="" fullWidth/>
                            </Grid>

                            <List id="friendList">
                                <Box style={{maxHeight: '50vh', overflow: 'auto'}}>
                                    {friends.map(friend => (
                                        <ListItem button key={friend.key}>
                                            <ListItemIcon>
                                                <Avatar alt="user_pic" src={friend.img} />
                                            </ListItemIcon>
                                            <ListItemText id="drop-labels" style={{'overflowWrap': 'break-word'}} primary={friend.name}/>
                                        </ListItem>
                                    ))}
                                </Box>
                                
                            </List>
                        </Grid>
                        <Grid item xs={10} component={Paper}>
                            <List>
                                <ListItem>
                                    <ListItemIcon>
                                        <Avatar alt="user_pic" src="https://material-ui.com/static/images/avatar/1.jpg" />
                                    </ListItemIcon>
                                    <ListItemText primary="1. Firstname Lastname"></ListItemText>
                                    <Button size="large" color="primary" className="fa fa-times" style={{float:"right", border:"0", backgroundColor:"white", fontSize:"20px"}} onClick={setModalIsOpenToFalse}/>
                                </ListItem>
                            </List>

                            <Divider/>
                            <Box style={{maxHeight: '53vh', overflow: 'auto', maxWidth:'auto', height:"53vh"}}>
                                <List>
                                    <ListItem key="1">
                                        <div style={{marginLeft:"auto"}}> 
                                            <Grid item>
                                                <List>
                                                    <ListItem>
                                                        <ListItemText align="right" style={{'overflowWrap': 'break-word', padding:"10px", backgroundColor:"#00B2FF", borderRadius:"20px", maxWidth:"50vw"}} 
                                                            primary={<Typography type="body2" style={{ color: 'white' }}>Main Users</Typography>}>
                                                        </ListItemText>
                                                    </ListItem>
                                                </List>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <ListItemText align="right" secondary="09:30"></ListItemText>
                                            </Grid>
                                        </div>
                                    </ListItem>

                                    <ListItem key="2">
                                        <Grid container>
                                            <Grid item>
                                                <List>
                                                    <ListItem>
                                                        <ListItemText align="left" style={{'overflowWrap': 'break-word', padding:"10px", backgroundColor:"#E8E8E8", borderRadius:"20px", maxWidth:"50vw"}} primary="Other User Response"></ListItemText>
                                                    </ListItem>
                                                </List>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <ListItemText align="left" secondary="09:31"></ListItemText>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                </List>
                            </Box>

                            <Box>
                                <div className="row "style={{padding:"1px"}}>
                                    <div className="col s12 valign-wrapper" style={{display:"flex", flexDirection:"right"}}>
                                        <TextField label="Send Message" variant="outlined" type="" fullWidth/>
                                        <Button className="center-align"><SendIcon /></Button>
                                    </div>
                                </div>
                            </Box>
                        </Grid>
                    </Grid>
                </div>
            </Modal>
        </>
    )
}

export default Chat