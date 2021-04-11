import React, { useState, useEffect, useRef } from 'react';

import axios from 'axios';
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Card, CardActionArea, CardMedia } from "@material-ui/core";
import Modal from 'react-modal';
import Typography from "@material-ui/core/Typography";

import Rating from '@material-ui/lab/Rating';
import Box from "@material-ui/core/Box";


import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';

import "./style.css";

import EnlargeTask from './EnlargeTask';
import "../App/App.css";
import { Types } from '../../constants/tasks';



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


const DetailedTask = ({workerID, taskID, status, typeID, name, price, description, address, deadline, email, phone, taskMode="finished"}) => {
  const [modalIsOpen,setModalIsOpen] = useState(false);
  const [finishTask, setFinishTask] = useState(false);
  const [deleteTask, setDeleteTask] = useState(false);
  const [confirmCompletedTask, setConfirmCompletedTask] = useState(false);
  const [review, setReview] = useState({
      rating: 0,
      description: '',
      taskID: taskID
  });

  const [showTask, setShowTask] = useState(true);

    const setModalIsOpenToTrue = () => { setModalIsOpen(true) };
    const setModalIsOpenToFalse = () => { setModalIsOpen(false); }

    const setConfirmFinished_Hide = () => { setFinishTask(false); }
    const setConfirmFinished_Show = () => { setFinishTask(true); }

    const setConfirmDelete_Hide = () =>{ setDeleteTask(false); }
    const setConfirmDelete_Show = () =>{ setDeleteTask(true); }

    const setConfirmCompletedTask_Hide = () =>{ setConfirmCompletedTask(false); }
    const setConfirmCompletedTask_Show = () =>{ setConfirmCompletedTask(true); }

    const finishedTask_put = () => {
      setConfirmFinished_Hide();
      setShowTask(false);

      var today = new Date();
      var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

      axios.patch(`http://localhost:3200/task/${taskID}`, {
        data: { dateCompleted: date, statusID: 3}
      })
      .then( console.log("Successfully changed statusID(2 -> 3)") );

      window.location.reload();
    };

    const confirmedTask_patch = () => {
      setConfirmCompletedTask_Hide();
      setShowTask(false);

      // Update task status
      axios.patch(`http://localhost:3200/task/${taskID}`, {
        data: { statusID: 4}
      })
      .then( console.log("Successfully changed statusID(3 -> 4)") )

      // Add review to task
      axios.post(`${process.env.REACT_APP_DATA_API}/review/${workerID}`, { review })
        .then((response) => { 
            // console.log(response.data);
            console.log("Added review to task");
        }, (error) => {
            console.log(error);
        });

    window.location.reload();
    }

    // Delete task
    const DeleteTask_delete = () => {
      setConfirmDelete_Hide();
      setShowTask(false);

      axios.delete(`http://localhost:3200/task/${taskID}`)
          .then( console.log("Successfully removed task") )
          .catch( console.log("Cannnot delete task") )

      window.location.reload();
    };

  const img = Types[typeID - 1].img;
  
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


      <Modal isOpen={confirmCompletedTask} style={customStyles} ariaHideApp={false} onRequestClose={()=> setConfirmCompletedTask(false)}>
        <center>
        Confirm completed tasks?
            <h5>Create a Review</h5>
        </center>
        <div>
            <form>
                <label>
                    Rating:
                    <br/>
                    <Box component="fieldset" mb={1} borderColor="transparent">
                        <Rating defaultValue={0} precision={0.5} 
                        name="rating" value={review.rating}
                        onChange={e => setReview({ ...review, rating: parseInt(e.target.value) })}/>
                    </Box>
                </label>
                <label>
                    Description:
                    <br/>
                    <textarea maxLength="1200" style={{width:"600px", height:"150px"}}
                    name="description" value={review.description}
                    onChange={e => setReview({ ...review, description: e.target.value })}/>
                </label>
                <br/>
                {/* <Button variant="contained" color="secondary" style={{float:"right", background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'}}>Submit</Button>{' '} */}
                <Button variant="contained" color="secondary" style={{float:"right"}} onClick={setConfirmCompletedTask_Hide}>Cancel</Button>{' '}
                <Button style={{float:"right"}} onClick={confirmedTask_patch}>Confirm</Button>
            </form>
        </div>
    </Modal>



      {/* Display Task in minimized version */}
      {showTask &&
      <div className="col" style={{ marginBottom:'1%' }}>
        <Card style={{ width: 300 }}>
          <label style={{color:"black", float:"left", marginTop:"1vh", marginLeft:"1vw"}}>{status}</label>

          {taskMode == "finished" && <Button size="small" style={{float:"right"}} onClick={setConfirmFinished_Show}><DoneIcon/></Button>}
          {taskMode == "delete" && <Button size="small" style={{float:"right"}} onClick={setConfirmDelete_Show}><CloseIcon/></Button>}
          {taskMode == "confirm" && <Button size="small" style={{float:"right"}} onClick={setConfirmCompletedTask_Show}><NotificationsNoneOutlinedIcon style={{color:"red"}} className="flicker" /></Button>}
          
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
              <Typography gutterBottom variant="h6" component="h2" align="left" noWrap>
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
            <Button href={`mailto:${email}`} size="small" color="primary">
                <Typography style={{color:"#ffab40"}}>Email</Typography>
            </Button>
            <Button style={{textAlign:"right"}} size="small" color="primary">
                <Typography style={{color:"#ffab40"}}>{phone}</Typography>
            </Button>
          </CardActions>
        </Card>
      </div>}
    </>
  )
}

DetailedTask.defaultProps = {
  img: "",
}

export default DetailedTask
