import React, { useState, useEffect } from 'react';

import axios from 'axios';
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Card, CardActionArea, CardMedia } from "@material-ui/core";
import Modal from 'react-modal';
import Typography from "@material-ui/core/Typography";

import default_img from "../../image/car_wash.jpeg";
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

import EnlargeTask from './EnlargeTask';
import Chat from '../Chat/Chat';
import "../App/App.css";



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
    backgroundColor: 'white'
  }
};


const DetailedTask = ({taskID, status, img, name, price, description, address, location, deadline, email, phone, taskMode="finished"}) => {
  const [modalIsOpen,setModalIsOpen] = useState(false);
  const [finishTask, setFinishTask] = useState(false);
  const [deleteTask, setDeleteTask] = useState(false);

  const [showTask, setShowTask] = useState(true);

    const setModalIsOpenToTrue = () => { setModalIsOpen(true) };
    const setModalIsOpenToFalse = () => { setModalIsOpen(false); }

    const setConfirmFinished_Hide = () => { setFinishTask(false); }
    const setConfirmFinished_Show = () => { setFinishTask(true); }

    const setConfirmDelete_Hide = () =>{ setDeleteTask(false); }
    const setConfirmDelete_Show = () =>{ setDeleteTask(true); }

    const finishedTask_put = () => {
      setConfirmFinished_Hide();
      setShowTask(false);

      var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

      axios.patch(`http://localhost:3200/task/${taskID}`, {
        data: { dateCompleted: date, statusID: 3}
      })
      .then( console.log("Successfully changed statusID") )
    };

    const DeleteTask_delete = () => {
      setConfirmDelete_Hide();
      setShowTask(false);

      axios.delete(`http://localhost:3200/task/${taskID}`)
          .then( console.log("Successfully removed task") );
    };

  
  return (
    <>
      {/* Display task on modal as bigger version */}
      <Modal isOpen={modalIsOpen} style={customStyles} ariaHideApp={false} onRequestClose={()=> setModalIsOpen(false)}>
        <Button size="large" color="primary" style={{float:"right", border:"0", backgroundColor:"white", fontSize:"20px"}} onClick={setModalIsOpenToFalse}><CloseIcon/></Button>
        <EnlargeTask name={name} price={price} description={description} address={address} deadline={deadline} email={email} phone={phone} />
      </Modal>

      <Modal isOpen={finishTask} style={customStyles} ariaHideApp={false} onRequestClose={()=> setFinishTask(false)}>
          Are you finished with your task?
          <br/>
          <Button variant="contained" color="secondary" style={{float:"right"}}onClick={setConfirmFinished_Hide}>Cancel</Button>{' '}
          <Button style={{float:"right"}} onClick={finishedTask_put}>Confirm</Button>
      </Modal>

      <Modal isOpen={deleteTask} style={customStyles} ariaHideApp={false} onRequestClose={()=> setDeleteTask(false)}>
        Are you sure you want to delete your task?
          <br/>
          <Button variant="contained" color="secondary" style={{float:"right"}} onClick={setConfirmDelete_Hide}>Cancel</Button>{' '}
          <Button style={{float:"right"}} onClick={DeleteTask_delete}>Confirm</Button>
      </Modal>


      {/* Display Task in minimized version */}
      {showTask &&
      <div className="col" style={{ marginBottom:'1%' }}>
        <Card style={{ width: 300 }}>
          <label style={{color:"black", float:"left", marginTop:"1vh", marginLeft:"1vw"}}>{status}</label>

          {taskMode == "finished" && <Button size="small" style={{float:"right"}} onClick={setConfirmFinished_Show}><DoneIcon/></Button>}
          {taskMode == "delete" && <Button size="small" style={{float:"right"}} onClick={setConfirmDelete_Show}><CloseIcon/></Button>}
          
          <CardActionArea onClick={setModalIsOpenToTrue}>
            <CardMedia
                      component="img"
                      height="140"
                      image={img}
                      title="Contemplative Reptile"
                    />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2" align="left" noWrap>
                {name.toUpperCase()}
                <br/>
                ${price}
              </Typography>
              <Typography gutterBottom variant="h6" component="h2" align="left">
                {address}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                align="left"
                noWrap
              >
                {description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Chat />
          </CardActions>
        </Card>
      </div>}
    </>
  )
}

DetailedTask.defaultProps = {
  img: default_img,
}

export default DetailedTask
