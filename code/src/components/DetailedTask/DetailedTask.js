import { useState } from "react";
import "../App/App.css";

import { Card, CardActionArea } from "@material-ui/core";

import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Modal from 'react-modal';

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white'
  }
};


const DetailedTask = ({name, price, description, location, deadline, email, phone}) => {
  const [modalIsOpen,setModalIsOpen] = useState(false);
  const [taskStatus, setTaskStatus] = useState(true);

    const setModalIsOpenToTrue =()=>{
        setModalIsOpen(true)
    }
    const setModalIsOpenToFalse =()=>{
        setModalIsOpen(false);
    }

    const setTaskStatusToFalse =()=>{
      alert("Task is finished. TODO send post request to change task status and get verified status to client customer and add a confirmation dialogue");
      setTaskStatus(false);
  }
  return (
    <>
      {/* Display task on modal as bigger version */}
      <Modal isOpen={modalIsOpen} style={customStyles} onRequestClose={()=> setModalIsOpen(false)}>
        <Button size="large" color="primary" class="fa fa-times" style={{float:"right", border:"0", backgroundColor:"white", fontSize:"20px"}} onClick={setModalIsOpenToFalse}/>
          <center><h5>{name.toUpperCase()}</h5></center>
          <div>
            <div>
              <b>Price: </b> ${price}
            </div>
            <div>
              <b>Deadline: </b> {deadline}
            </div>
            <div>
              <b>Address: </b> {location}
            </div>
            <div>
              <b>Description: </b>{description}
            </div>
            <div>
              <hr/>
              <b>Contact Info</b> <br/>
              <b>Email: </b>{email} <br/>
              <b>Phone: </b>{phone}
            </div>
          </div>
      </Modal>


      {/* Display Task in minimized version */}
      {taskStatus &&
      <div className="col" style={{ marginBottom:'1%' }}>
        <Card style={{ width: 300 }}>
          <Button size="small" color="primary" class="fa fa-check" style={{color:"green", float:"right", border:"0", backgroundColor:"white"}} onClick={setTaskStatusToFalse}/>
          <CardActionArea>
            <CardContent onClick={setModalIsOpenToTrue}>
              <Typography gutterBottom variant="h5" component="h2" align="left" noWrap>
                {name.toUpperCase()}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                align="left"
              >
                <b>Price: </b> ${price}
              </Typography>

              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                align="left"
              >
                <b>Deadline: </b> {deadline}
              </Typography>

              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                align="left"
              >
                <b>Address: </b> {location}
              </Typography>

              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                align="left"
                noWrap
              >
                <b>Description: </b>{description}
              </Typography>

              <hr/>

              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                align="left"
              >
                <b>Contact Info</b>
              </Typography>

              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                align="left"
              >
                <b>Email: </b>{email}
              </Typography>

              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                align="left"
              >
                <b>Phone: </b>{phone}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" variant="outlined" onClick={setModalIsOpenToTrue}>
              Learn More
            </Button>
            <Button size="small" color="primary" variant="outlined">
              Message
            </Button>
          </CardActions>
        </Card>
      </div>}
    </>
  )
}

export default DetailedTask
