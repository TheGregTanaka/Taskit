import axios from 'axios';
import { Button } from '@material-ui/core';
import Modal from 'react-modal';
import { useState } from 'react'

const customStyles = {
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

    const [task, setTask] = useState({
        typeID: 1, // temp
        taskerID: 1, // temp
        workerID: 1, // temp
        dateCompleted: "", // temp
        rating: 0, // temp

        title: "",
        offeredPrice: 0,
        description: "",
        statusID: 1,
        
        negotiable: 0,
        
        img: "",
        remotePossible: 0,
    });
    
     // Create Task Modal
     const [modalIsOpen, setModalIsOpen] = useState(false);

     const setModalIsOpenToTrue =()=>{ setModalIsOpen(true); }
     const setModalIsOpenToFalse =()=>{ setModalIsOpen(false); }

    const handleSubmit = e => { 
        e.preventDefault();
        setModalIsOpenToFalse();
        
        axios.post('http://localhost:3200/task', { task })
            .then((response) => { 
                console.log(response.data);
            }, (error) => {
                console.log(error);
            });
    }

   

    return(
        <>
            <Button variant="contained" color="inherit" onClick={setModalIsOpenToTrue}>Create Task</Button>
            <Modal isOpen={modalIsOpen} style={customStyles} onRequestClose={()=> setModalIsOpenToFalse} scrollable={true}>
                <center>
                    <h5>Create a Task</h5>
                </center>
                <div>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Task name: 
                            <input type="text" name="task_name" value={task.title} onChange={e => setTask({ ...task, title: e.target.value })}/>
                        </label>
                        <label>
                            Price:
                            <input type="number" name="task_price" placeholder="USD" value={task.offeredPrice} onChange={e => setTask({ ...task, offeredPrice: e.target.value })}/>
                        </label>
                        <label>
                            Description: 
                            <br/>
                            <textarea id="task_desc" maxLength="1200" style={{width:"100%", height:"150px"}} placeholder={"I will"}
                                value={task.description} onChange={e => setTask({ ...task, description: e.target.value })}/>
                        </label>
                        <label>
                            Location: 
                            <input type="text" name="task_loc"/>
                        </label>
                        <label>
                            Deadline: 
                            <input type="date" name="task_deadline" value={task.dateCompleted} onChange={e => setTask({ ...task, dateCompleted: e.target.value })}/>
                        </label>
                        <label>
                            Image:
                            <br/>
                            <input type="file" name="task_img" accept="image/*"></input>
                        </label>
                        <Button type="submit" variant="contained" color='inherit' style={{float:"right", margin:"1% 1% 1% 1%"}}>Submit</Button>
                        <Button variant="outlined" color="secondary" onClick={setModalIsOpenToFalse} style={{float:"right", margin:"1% 1% 1% 1%"}}>Cancel</Button>
                    </form>
                </div>
            </Modal>
        </>
    )
}
export default CreateTask;