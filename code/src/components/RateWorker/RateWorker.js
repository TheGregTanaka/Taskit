import React, { useState } from 'react';
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

    // Make Post request - create review
    const [review, setReview] = useState({rating: 0, description: '', taskID: null});
    const handleSubmit = e => { 
        e.preventDefault();
        setModalIsOpenToFalse();
        
        axios.post('http://localhost:3200/review', { review })
            .then((response) => { 
                // console.log(response.data);
            }, (error) => {
                console.log(error);
            });
    }

    return(
        <>
            <button onClick={setModalIsOpenToTrue}>Open rate worker modal</button>
            
            <Modal isOpen={modalIsOpen} style={customStyles} onRequestClose={()=> setModalIsOpen(false)}>
                <center>
                    <h5>Rate your Worker</h5>
                </center>
                <div>
                    <form onSubmit={handleSubmit}>
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
                        <input type="submit" style={{float:"right", margin:"1% 1% 1% 1%"}}/>
                    </form>
                </div>
            </Modal>
        </>
    )
}
export default RateWorker;