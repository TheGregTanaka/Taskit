import axios from 'axios';
import { Button } from '@material-ui/core';
import Modal from 'react-modal';
import React, { useState } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Types } from '../../constants/tasks';

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

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
      marginTop: '2%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
    }
};

function CreateTask (){
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    // Get user information
    const user = JSON.parse(localStorage.getItem('user'));
    const userID = user ? user.id : 'null';
    const em  = user ? user.email : 'null';

    const [task, setTask] = useState({
        title: "",
        typeID: 6, // Default is typeID 6(Misc)
        description: "",
        price: "",
        taskerID: userID,
        datePosted: date,
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "",
    });
    const [notify, setNotify] = useState(false);
    const [notifyMsg, setNotifyMsg] = useState({
        severity: "success",
        message: ""
    });

    const handleClick = () => { setNotify(true); };
    const handleClose = () => { setNotify(false); };
    
     // Create Task Modal
     const [modalIsOpen, setModalIsOpen] = useState(false);

     const setModalIsOpenToTrue =()=>{ setModalIsOpen(true); }
     const setModalIsOpenToFalse =()=>{ setModalIsOpen(false); }

    const handleSubmit = e => { 
        e.preventDefault();
        setModalIsOpenToFalse();
        setNotify(true);
        
        axios.post(`${process.env.REACT_APP_DATA_API}/task`, task)
          .then((response) => { 
            //   console.log(response.data);
              setNotifyMsg({severity:"success", message:"Task Created!"});
              window.location.reload();
          }, (error) => {
            //   console.log(error);
              setNotifyMsg({severity:"Error", message:"Uh-oh"});
          });
    }

    return(
        <>
            <Snackbar open={notify} autoHideDuration={5000} onClose={handleClose} >
                <Alert elevation={6} variant="filled" severity={notifyMsg.severity}> 
                {notifyMsg.message}
                </Alert>
            </Snackbar>
            <Button variant="contained" color="inherit" onClick={setModalIsOpenToTrue}>Create Task</Button>
            <Modal isOpen={modalIsOpen} style={customStyles} ariaHideApp={false} onRequestClose={()=> setModalIsOpenToFalse} scrollable={true}>
                <center>
                    <h5>Create a Task</h5>
                </center>
                <div>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Task name: 
                            <input type="text" name="task_name" value={task.title} onChange={e => setTask({ ...task, title: e.target.value })} required/>
                        </label>
                        <br/>
                        <div className="row">
                            <div className="col">
                                <label>
                                    Price:
                                    <input type="number" name="task_price" placeholder="USD" value={task.price} onChange={e => setTask({ ...task, price: e.target.value })} required/>
                                </label>
                            </div>
                            <div className="col" style={{marginTop:"1.5vh"}}>
                                <label>
                                    Type: <br/>
                                        <Select labelID="typeSelector" 
                                                id="typeSelect" 
                                                defaultValue="none"
                                                onChange={e => setTask({...task, typeID: e.target.value})} 
                                                required>
                                            <MenuItem value="none" disabled>Select a Type</MenuItem>
                                            {Types.map((type) => (
                                                <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>))}
                                        </Select>
                                </label>
                            </div>
                        </div>
                        <label>
                            Address:
                            <input type="text" name="task_addr" value={task.address} onChange={e => setTask({ ...task, address: e.target.value })} required/>
                        </label>
                        <label>
                            City: 
                            <input type="text" name="task_addr" value={task.city} onChange={e => setTask({ ...task, city: e.target.value })} required/>
                        </label>
                        <div className="row">
                            <div className="col">
                                <label>
                                    State:
                                    <input type="text" name="task_addr" value={task.state} onChange={e => setTask({ ...task, state: e.target.value })} required/>
                                </label>
                            </div>
                            <div className="col">
                                <label>
                                    Zip:
                                    <input type="text" name="task_addr" value={task.zip} onChange={e => setTask({ ...task, zip: e.target.value })} required/>
                                </label>
                            </div>
                            <div className="col">
                                <label>
                                    Country:
                                    <input type="text" name="task_addr" value={task.country} onChange={e => setTask({ ...task, country: e.target.value })} required/>
                                </label>
                            </div>
                        </div>
                        <label>
                            Description: 
                            <br/>
                            <textarea id="task_desc" maxLength="1200" style={{width:"100%", height:"150px", padding:"10px"}} placeholder={"I will"}
                                value={task.description} onChange={e => setTask({ ...task, description: e.target.value })} required/>
                        </label>
                        <label>
                            <Button type="submit" variant="contained" color='inherit' style={{float:"right", margin:"1% 1% 1% 1%"}}>Submit</Button>
                            <Button variant="outlined" color="secondary" onClick={setModalIsOpenToFalse} style={{float:"right", margin:"1% 1% 1% 1%"}}>Cancel</Button>
                        </label>
                    </form>
                </div>
            </Modal>
        </>
    )
}
export default CreateTask;
