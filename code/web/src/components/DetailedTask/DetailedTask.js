import { useState } from "react";
import "../App/App.css";

import { Card, CardActionArea } from "@material-ui/core";

import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

import Modal from 'react-modal';

import EnlargeTask from './EnlargeTask'
import MinimizedTask from "./MinimizedTask";
import Chat from '../Chat/Chat'

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
        <EnlargeTask name={name} price={price} description={description} location={location} deadline={deadline} email={email} phone={phone} />
      </Modal>


      {/* Display Task in minimized version */}
      {taskStatus &&
      <div className="col" style={{ marginBottom:'1%' }}>
        <Card style={{ width: 300 }}>
          <Button size="small" color="primary" class="fa fa-check" style={{color:"green", float:"right", border:"0", backgroundColor:"white"}} onClick={setTaskStatusToFalse}/>
          <CardActionArea>
            <CardContent onClick={setModalIsOpenToTrue}>
              <MinimizedTask name={name} price={price} description={description} location={location} deadline={deadline} email={email} phone={phone} />
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

export default DetailedTask
