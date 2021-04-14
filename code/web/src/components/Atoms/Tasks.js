import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Card, CardActionArea } from "@material-ui/core";
import axios from "axios";
import { useHistory } from 'react-router';
import Map from '../Map/Map';
import { Types} from '../../constants/tasks';
  
  
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

    const user = JSON.parse(localStorage.getItem('user'));
    const id    = user ? user.id : 'null';
    const history = useHistory();

    const acceptInfo = {
        statusID: 2,
        workerID: id
    };

    const handleOpen = () => {
      if (user) {
        setOpen(true);
      } else {
        history.push('/login');
      }
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    function acceptTask() {
        axios
            .patch(`${process.env.REACT_APP_DATA_API}/task/` + props.id, acceptInfo)
            .then((response) => {
                console.log(response);
                history.push("/workspace");
            }, (error) => {
                console.log(error);
            });
    };
  
    const body = (
      
        <div className={classes.paper} style={{top:'15%', left:'19%'}}>
          <center>
        <Card style={{ width: 900 , height:500, }}>
          <CardActionArea>
            
            <CardContent>
              <Typography gutterBottom variant="h6" component="h2" align="right">
                Posted Date: {(props.posted.split('T'))[0]} 
              </Typography>
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
                <br/>
              </Typography>
              <div><Map address={props.address + ", " + props.city + ", " + props.state + ", " + props.zip + ", " + props.country} /></div>
            </CardContent>
          </CardActionArea>
          <CardActions>
             <Button variant="outlined" color="primary" onClick={() => acceptTask()}>
                 Accept
             </Button>
          </CardActions>
        </Card>
        </center>
      </div>
      
    );
  
    return (
      
      
                <div>
        <Card style={{ width: 900 }}>
          <CardActionArea  onClick={handleOpen}>
            <CardMedia
              component="img"
              height="400"
              image={Types[props.typeID - 1].img}
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
          <Button variant="outlined" color="primary" onClick={handleOpen}>
          Learn more
        </Button>
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
