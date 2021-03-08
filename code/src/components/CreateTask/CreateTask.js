import React, {useState} from 'react';
import Modal from 'react-modal';

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

function CreateTask (){

    const [modalIsOpen,setModalIsOpen] = useState(false);

    const setModalIsOpenToTrue =()=>{
        setModalIsOpen(true)
    }

    const setModalIsOpenToFalse =()=>{
        setModalIsOpen(false)
    }

    return(
        <>
            <button onClick={setModalIsOpenToTrue}>Open Create Task Modal</button>
            
            <Modal isOpen={modalIsOpen} style={customStyles} onRequestClose={()=> setModalIsOpen(false)}>
                <center>
                    <h5>Create a Task</h5>
                </center>
                <div>
                    <form>
                        <label>
                            Task name: 
                            <input type="text" name="task_name"/>
                        </label>
                        <label>
                            Price:
                            <input type="number" name="task_price" placeholder="USD"/>
                        </label>
                        <label>
                            Description: 
                            <input type="text" name="task_desc" maxLength="1200" placeholder="I will"/>
                        </label>
                        <label>
                            Location: 
                            <input type="text" name="task_loc"/>
                        </label>
                        <label>
                            Deadline: 
                            <input type="date" name="task_deadline"/>
                        </label>
                        <label>
                            Image:
                            <br/>
                            <input type="file" id="img" name="task_img" accept="image/*"></input>
                        </label>
                        <button onClick={setModalIsOpenToFalse} style={{float:"right", margin:"1% 1% 1% 1%"}}>Cancel</button>
                        <input type="submit" value="Submit" style={{float:"right", margin:"1% 1% 1% 1%"}}/>
                    </form>
                </div>
            </Modal>
        </>
    )
}
export default CreateTask;