import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Card, CardActionArea, CardMedia } from "@material-ui/core";
import Modal from 'react-modal';
import Typography from "@material-ui/core/Typography";



import CloseIcon from '@material-ui/icons/Close';

import "../DetailedTask/style.css";


import EnlargeTask from '../DetailedTask/EnlargeTask';
import Payment from './Payment';
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


const CheckoutCard = ({workerID, taskID, typeID, 
                        name, price, description, 
                        status, email, phone,
                        address, city, state, zip, country}) => {
  const [modalIsOpen,setModalIsOpen] = useState(false);

  const setModalIsOpenToTrue = () => { setModalIsOpen(true); }
  const setModalIsOpenToFalse = () => { setModalIsOpen(false); }


  const img = Types[typeID - 1].img;
  
  return (
    <>
      {/* Display task on modal as bigger version */}
      <Modal isOpen={modalIsOpen} style={customStyles} ariaHideApp={false} onRequestClose={()=> setModalIsOpen(false)}>
        <Button size="large" color="primary" style={{float:"right", border:"0", backgroundColor:"white", fontSize:"20px"}} onClick={setModalIsOpenToFalse}><CloseIcon/></Button>
        <EnlargeTask name={name} price={price} description={description} email={email} phone={phone} 
                      address={address} city={city} state={state} zip={zip} country={country} />
      </Modal>

      {/* Display Task in minimized version */}
      <div className="col" style={{ marginBottom:'1%' }}>
        <Card style={{ width: 300 }}>
          <label style={{color:"black", float:"left", marginTop:"1vh", marginLeft:"1vw"}}>{status}</label>

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
        </Card>
      </div>
    </>
  )
}


export default CheckoutCard
