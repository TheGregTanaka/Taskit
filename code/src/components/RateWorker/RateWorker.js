import React, {useState} from 'react';
import Modal from 'react-modal';
import Rating from '@material-ui/lab/Rating';
import Box from "@material-ui/core/Box";
import axios from 'axios';

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

function RateWorker (){
    const [modalIsOpen,setModalIsOpen] = useState(false);
    const setModalIsOpenToTrue =()=>{
        setModalIsOpen(true)
    }
    const setModalIsOpenToFalse =()=>{
        setModalIsOpen(false);
    }

    return(
        <>
            <button onClick={setModalIsOpenToTrue}>Open rate worker modal</button>
            
            <Modal isOpen={modalIsOpen} style={customStyles} onRequestClose={()=> setModalIsOpen(false)}>
                <center>
                    <h5>Rate your Worker</h5>
                </center>
                <div>
                    <form>
                        <label>
                            Rating:
                            <br/>
                            <Box component="fieldset" mb={1} borderColor="transparent">
                                <Rating name="half-rating-large" defaultValue={0} precision={0.5} size="large"/>
                            </Box>
                        </label>
                        <label>
                            Description:
                            <br/>
                            <textarea id="task_desc" maxLength="1200" style={{width:"600px", height:"150px"}}/>
                        </label>
                        <br/>
                        <input type="submit" value="Submit" onClick={setModalIsOpenToFalse} style={{float:"right", margin:"1% 1% 1% 1%"}}/>
                    </form>
                </div>
            </Modal>
        </>
    )
}
export default RateWorker;