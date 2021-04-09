import axios from 'axios';
import { Button } from '@material-ui/core';
import Modal from 'react-modal';
import React, { useState } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {TYPEID, Types } from '../../constants/tasks';

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
      height: "80vh",
      width: "auto"

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
        typeID: "1",
        description: "",
        price: 0,
        taskerID: userID,
        dateCompleted: "",
        datePosted: date,
        img: "",
        address: "",
        lat: 0,
        lng: 0,
    });
    
     // Create Task Modal
     const [modalIsOpen, setModalIsOpen] = useState(false);

     const setModalIsOpenToTrue =()=>{ setModalIsOpen(true); }
     const setModalIsOpenToFalse =()=>{ setModalIsOpen(false); }

    const handleSubmit = e => { 
        e.preventDefault();
        setModalIsOpenToFalse();
        
        axios.post('http://localhost:3200/task', task)
            .then((response) => { 
                console.log(response.data);
            }, (error) => {
                console.log(error);
            });
    }

    return(
        <>
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
                        <label>
                            Price:
                            <br/>
                            <input type="number" name="task_price" placeholder="USD" value={task.price} onChange={e => setTask({ ...task, price: e.target.value })} required/>
                        </label>
                        <label>
                            Type:
                              <br/>
                                <Select labelID="typeSelector" id="typeSelect" defaultValue="none">
                                  <MenuItem value="none" disabled>Select a Type</MenuItem>
                                  {Types.map((type) => (
                                    <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>))}
                                    </Select>
                        </label>
                        <br/>
                        <label>
                            Address: 
      <br/>
                            <input type="text" name="task_addr" value={task.address} onChange={e => setTask({ ...task, address: e.target.value })} required/>
                        </label>
      <br/>
                        <label>
                            Description: 
                            <br/>
                            <textarea id="task_desc" maxLength="1200" style={{width:"100%", height:"150px"}} placeholder={"I will"}
                                value={task.description} onChange={e => setTask({ ...task, description: e.target.value })} required/>
                        </label>
                        <label>
                            Deadline: 
                            <input type="date" name="task_deadline" value={task.dateCompleted} onChange={e => setTask({ ...task, dateCompleted: e.target.value })} required/>
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
