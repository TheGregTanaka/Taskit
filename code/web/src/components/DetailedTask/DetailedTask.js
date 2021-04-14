import React, { useState, useEffect, useRef } from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
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
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import CloseIcon from '@material-ui/icons/Close';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import PaymentIcon from '@material-ui/icons/Payment';

import "./style.css";


import EnlargeTask from './EnlargeTask';
import Payment from '../Payment/Payment';
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


const DetailedTask = ({workerID, taskID, typeID, 
                      name, price, description, 
                      status, email, phone,
                      taskMode="finished",
                      address, city, state, zip, country}) => {
  const [modalIsOpen,setModalIsOpen] = useState(false);
  const [finishTask, setFinishTask] = useState(false);
  const [deleteTask, setDeleteTask] = useState(false);
  const [confirmCompletedTask, setConfirmCompletedTask] = useState(false);
  const [dropTask, setDropTask] = useState(false);
  const [review, setReview] = useState({
      rating: 0,
      description: '',
      taskID: taskID
  });
  const [pendingPayment, setPendingPayment] = useState(false);
  const [notify, setNotify] = useState(false);
  const [notifyMsg, setNotifyMsg] = useState({
    severity: "success",
    message: ""
  });

  const handleClick = () => { setNotify(true); };
  const handleClose = () => { setNotify(false); };

  const [showTask, setShowTask] = useState(true);

    const setModalIsOpenToTrue = () => { setModalIsOpen(true) };
    const setModalIsOpenToFalse = () => { setModalIsOpen(false); }

    const setConfirmFinished_Hide = () => { setFinishTask(false); }
    const setConfirmFinished_Show = () => { setFinishTask(true); }

    const setConfirmDelete_Hide = () =>{ setDeleteTask(false); }
    const setConfirmDelete_Show = () =>{ setDeleteTask(true); }

    const setConfirmCompletedTask_Hide = () =>{ setConfirmCompletedTask(false); }
    const setConfirmCompletedTask_Show = () =>{ setConfirmCompletedTask(true); }

    const setDropTask_Hide = () => { setDropTask(false); }
    const setDropTask_Show = () => { setDropTask(true); }

    const setPendingPayment_Hide = () => { setPendingPayment(false); }
    const setPendingPayment_Show = () => { setPendingPayment(true); }
    const api = process.env.REACT_APP_DATA_API;

    const finishedTask_put = () => {
      setConfirmFinished_Hide();
      setShowTask(false);

      var today = new Date();
      var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

      axios.patch(`${api}/task/${taskID}`, {
        data: { dateCompleted: date, statusID: 3}
      })
      .then(response => {
        window.scrollTo(0, 0);
        setNotify(true);
        setNotifyMsg({severity:"success", message:"You've completed a task!"});
      } );

      // window.location.reload();
    };

    const confirmedTask_patch = () => {
      setConfirmCompletedTask_Hide();
      setShowTask(false);

      // Update task status
      axios.patch(`${api}/task/${taskID}`, {
        data: { statusID: 4}
      })
      .then( 
        // console.log("Successfully changed statusID(3 -> 4)")
        )

      // Add review to task
      axios.post(`${process.env.REACT_APP_DATA_API}/review/${workerID}`, { review })
        .then((response) => { 
            // console.log(response.data);
            // console.log("Added review to task");
        }, (err) => {
            console.log(err);
        });
    window.scrollTo(0, 0);
    setNotify(true);
    setNotifyMsg({severity:"success", message:"Confirmation Complete"});
    }

    // Delete task
    const DeleteTask_delete = () => {
      setConfirmDelete_Hide();
      setNotify(true);
      window.scrollTo(0, 0);
      if (status == "Pending" || status == "Accepted") {
        axios.delete(`${api}/task/${taskID}`)
          .then(response => {
            // console.log("Successfully removed task");
            setNotifyMsg({severity:"success", message:"Successfully deleted a task"});
            setShowTask(false);
            // window.location.reload();
          })
          .catch(err => {
            setShowTask(true);
            setNotifyMsg({severity:"error", message:"You cannot delete a task that has already been accepted."});
          });
      } else if (status == "Complete") {
        axios.delete(`${api}/task/deleteComplete/${taskID}`)
          .then(response => {
            // console.log("Successfully removed task");
            setNotifyMsg({severity:"success", message:"Successfully deleted a task"});
            setShowTask(false);
            // window.location.reload();
          })
        }else if (status == "Pending Payment" || status == "Confirmation Required") {
          setShowTask(true);
          setNotifyMsg({severity:"error", message:"You cannot delete a task that has already been accepted."});
      }
    };

    // Drop Task
    const DropTask_patch = () => {
      setDropTask_Hide();
      setShowTask(false);
      window.scrollTo(0, 0);
      // Update task status
      axios.patch(`${api}/task/drop/${taskID}`)
      .then( response => {
        console.log("Successfully changed statusID(2 -> 1) and workerID -> null");
        setNotify(true);
        setNotifyMsg({severity:"success", message:"Successfully dropped task"});
        // window.location.reload();
      });
    };

  const img = Types[typeID - 1].img;
  
  return (
    <>
      {/* Display task on modal as bigger version */}
      <Modal isOpen={modalIsOpen} style={customStyles} ariaHideApp={false} onRequestClose={()=> setModalIsOpen(false)}>
        <Button size="large" color="primary" style={{float:"right", border:"0", backgroundColor:"white", fontSize:"20px"}} onClick={setModalIsOpenToFalse}><CloseIcon/></Button>
        <EnlargeTask name={name} price={price} description={description} workerID={workerID} email={email} phone={phone} 
                      address={address} city={city} state={state} zip={zip} country={country} />
      </Modal>

      <Modal isOpen={finishTask} style={customStyles} ariaHideApp={false} onRequestClose={()=> setFinishTask(false)}>
          Are you finished with this task?
          <br/>
          <Button variant="contained" color="secondary" style={{float:"right"}}onClick={setConfirmFinished_Hide}>Cancel</Button>{' '}
          <Button style={{float:"right"}} onClick={finishedTask_put}>Confirm</Button>
      </Modal>

      <Modal isOpen={deleteTask} style={customStyles} ariaHideApp={false} onRequestClose={()=> setDeleteTask(false)}>
        Are you sure you want to delete this task?
          <br/>
          <Button variant="contained" color="secondary" style={{float:"right"}} onClick={setConfirmDelete_Hide}>Cancel</Button>{' '}
          <Button style={{float:"right"}} onClick={DeleteTask_delete}>Confirm</Button>
      </Modal>

      <Modal isOpen={dropTask} style={customStyles} ariaHideApp={false} onRequestClose={()=> setDropTask(false)}>
        Are you sure you want to drop this task?
          <br/>
          <Button variant="contained" color="secondary" style={{float:"right"}} onClick={setDropTask_Hide}>Cancel</Button>{' '}
          <Button style={{float:"right"}} onClick={DropTask_patch}>Confirm</Button>
      </Modal>

      <Modal isOpen={pendingPayment} style={customStyles} ariaHideApp={false} onRequestClose={()=> setPendingPayment(false)}>
        <div className="row">
          <CloseIcon style={{float:"right"}} onClick={setPendingPayment_Hide} />
        </div>
        <div className="row">
          <Payment workerID={workerID} taskID={taskID} typeID={typeID}
                      name={name} price={price} description={description}
                      status={status} email={email} phone={phone}
                      address={address} city={city} state={state} zip={zip} country={country}/>
        </div>
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

    <Snackbar open={notify} autoHideDuration={5000} onClose={handleClose} >
        <Alert elevation={6} variant="filled" severity={notifyMsg.severity}> 
        {notifyMsg.message}
        </Alert>
    </Snackbar>


      {/* Display Task in minimized version */}
      {showTask &&
      <div className="col" style={{ marginTop:'1%' }}>
        <Card style={{ width: 300 }}>
          <label style={{color:"black", float:"left", marginTop:"1vh", marginLeft:"1vw"}}>{status}</label>

          {taskMode == "finished" && <Button size="small" style={{float:"right"}} onClick={setConfirmFinished_Show}><DoneIcon/></Button>}
          {taskMode == "finished" && <Button size="small" style={{float:"right"}} onClick={setDropTask_Show}><RemoveCircleIcon style={{color:"red"}}/></Button>}
          {taskMode == "delete" && <Button size="small" style={{float:"right"}} onClick={setConfirmDelete_Show}><CloseIcon/></Button>}
          {taskMode == "confirm" && <Button size="small" style={{float:"right"}} onClick={setConfirmCompletedTask_Show}><NotificationsNoneOutlinedIcon style={{color:"red"}} className="flicker" /></Button>}
          {taskMode == "pay" && <Button size="small" style={{float:"right"}} onClick={setPendingPayment_Show}><PaymentIcon style={{color:"red"}} className="flicker" /></Button>}
          
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
                {address + ", " + city + ", " + state + ", " + zip + ", " + country}
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
