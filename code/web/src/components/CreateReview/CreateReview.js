import React, { useState } from 'react';
import Modal from 'react-modal';
import Rating from '@material-ui/lab/Rating';
import Box from "@material-ui/core/Box";
import axios from 'axios';

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

function CreateReview (){
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
        
        axios.post(`${process.env.REACT_APP_DATA_API}/review`, { review })
            .then((response) => { 
                // console.log(response.data);
            }, (error) => {
                console.log(error);
            });
    }

    return(
        <>
            <button onClick={setModalIsOpenToTrue}>Open review modal</button>
            
            <Modal isOpen={modalIsOpen} style={customStyles} ariaHideApp={false} onRequestClose={()=> setModalIsOpen(false)}>
                <center>
                    <h5>Create a Review</h5>
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
export default CreateReview;
