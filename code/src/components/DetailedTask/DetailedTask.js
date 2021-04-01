import { useState } from "react";
import "../App/App.css";

// import { Card, CardActionArea } from "@material-ui/core";

import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

import Modal from 'react-modal';

import EnlargeTask from './EnlargeTask'
import Chat from '../Chat/Chat'


import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Card, CardActionArea, CardMedia } from "@material-ui/core";
import default_img from "../../image/car_wash.jpeg";

import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

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


const DetailedTask = ({img, name, price, description, location, deadline, email, phone}) => {
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
      <Modal isOpen={modalIsOpen} style={customStyles} ariaHideApp={false} onRequestClose={()=> setModalIsOpen(false)}>
        <Button size="large" color="primary" style={{float:"right", border:"0", backgroundColor:"white", fontSize:"20px"}} onClick={setModalIsOpenToFalse}><CloseIcon/></Button>
        <EnlargeTask name={name} price={price} description={description} location={location} deadline={deadline} email={email} phone={phone} />
      </Modal>


      {/* Display Task in minimized version */}
      {taskStatus &&
      <div className="col" style={{ marginBottom:'1%' }}>
        <Card style={{ width: 300 }}>
          <Button size="small" color="primary" style={{color:"green", float:"right", border:"0", backgroundColor:"white"}} onClick={setTaskStatusToFalse}><DoneIcon/></Button>
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
                {location}
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
