import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Card, CardActionArea } from "@material-ui/core";

import imag from "../../image/car_wash.jpeg";
  
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 800,
      height: 500,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      
    },
  }));
  
  export default function SimpleModal(props) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    //const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const body = (
      <div className={classes.paper} style={{top:'15%', left:'19%'}}> 
          <center>
        <Card style={{ width: 900 , height:500, }}>
          <CardActionArea>
            
            <CardContent>
              <Typography gutterBottom variant="h4" component="h2" align="left">
                {props.name} - <b>${props.price}</b>
              </Typography>
              <Typography gutterBottom variant="h6" component="h2" align="left">
                Location: {props.location} 
              </Typography>
              <Typography style={{paddingTop: 10}} variant="body2" color="textSecondary" align="left">
                Description: {props.description} 
                <br/>
                <br/>
                Email: {props.email}
                <br/>
                <br/>
                Phone Number: {props.phone}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
             <button type="button" onClick={handleOpen}>
                 Accept
             </button>
          </CardActions>
        </Card>
        </center>
      </div>
    );
  
    return (
      
      
                <div>
        <Card style={{ width: 900 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="400"
              image={imag}
              title="Task Photo"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2" align="left">
                {props.name} - <b>${props.price}</b>
              </Typography>
              <Typography gutterBottom variant="h6" component="h2" align="left">
                {props.location}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                align="left"
              >
                {props.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
          <button type="button" onClick={handleOpen}>
          Learn more
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
          </CardActions>
        </Card>
        <br />
      </div>
       
    
    );
  }