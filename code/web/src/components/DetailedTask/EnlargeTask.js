import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import Modal from 'react-modal';
import Map from '../Map/Map.js';
import CloseIcon from '@material-ui/icons/Close';
import PublicProfile from '../PublicProfile/PublicProfile'
import Box from '@material-ui/core/Box';
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
      marginTop:"5%",
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white'
    }
  };

const EnlargeTask = ({name, price, description, workerID, email, phone,
                    address, city, state, zip, country}) => {
        const [modalIsOpen,setModalIsOpen] = useState(false);
        const setModalIsOpenToTrue = () => { setModalIsOpen(true) };
        const setModalIsOpenToFalse = () => { setModalIsOpen(false); }
    return (
        <div>
            <Modal isOpen={modalIsOpen} style={customStyles} ariaHideApp={false} onRequestClose={()=> setModalIsOpen(false)}>
            
                <Box style={{maxHeight: '90vh', overflow: 'auto', backgroundColor:"#282c34"}}>
                    <div className="row">
                        <Button size="large" color="primary" style={{float:"right", border:"0", backgroundColor:"white", fontSize:"20px"}} onClick={setModalIsOpenToFalse}><CloseIcon/></Button>
                    </div>
                    <div className="row">
                        <PublicProfile id={workerID}/>
                    </div>
                </Box>
            </Modal>
            <center><h5>{name.toUpperCase()}</h5></center>
            <div>
                <div>
                    <b>Price: </b> ${price}
                </div>
                <div>
                    <b>Address: </b> {address + ", " + city + ", " + state + ", " + zip + ", " + country}
                </div>
                <div>
                    <b>Description: </b>{description}
                </div>
                <div>
                <br />
                    <b>Contact Info</b> <br/>
                    &nbsp;&nbsp;&nbsp;<b>Email: </b>{email} <br/>
                    &nbsp;&nbsp;&nbsp;<b>Phone: </b>{phone}
                </div>
                <div>
                    {workerID != null && 
                        <Button variant="contained" onClick={setModalIsOpenToTrue}>Click to View Worker Profile</Button>
                    }
                </div>
                <br/>
                <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"center", alignItems:"center"}}>
                    <Map 
                      address={address + ", " + city + ", " + state + ", " + zip + ", " + country}
                    />
                </div>
            </div>
        </div>
    )
}

export default EnlargeTask
