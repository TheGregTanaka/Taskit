import React, { useState } from 'react'
// import DetailedTask from '../DetailedTask/DetailedTask'
import DetailedFeed from './DetailedFeed'                // Dummy feed
import { Button } from '@material-ui/core';
import Modal from 'react-modal';
import CreateTask from '../CreateTask/CreateTask'
import CompanyProfile from '../CompanyProfile/CompanyProfile'

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


const Workspace = () => {
    // Display Company Profile
    const [page, setPage] = useState("");

    // Create Task Modal
    const [modalIsOpen,setModalIsOpen] = useState(false);

    const setModalIsOpenToTrue =()=>{
        setModalIsOpen(true)
    }

    const setModalIsOpenToFalse =()=>{
        setModalIsOpen(false)
    }
    return (
        <div>
            <div className="row" style={{marginTop:'5%'}}>
                <div className="col" style={{float:"left"}}>
                    <Button variant="contained" color="inherit" onClick={() => setPage("companyprofile")}>View Company Profile</Button>
                    {page === "companyprofile" && <Button variant="contained" color="inherit" onClick={() => setPage("")}>Close View</Button>}
                </div>

                <div className="col" style={{float:"right"}}>
                <Button variant="contained" color="inherit" onClick={setModalIsOpenToTrue}>Create Task</Button>
                <Modal isOpen={modalIsOpen} style={customStyles} onRequestClose={()=> setModalIsOpen(false)}>
                    <CreateTask/>
                    
                    <Button variant="outlined" color="secondary" onClick={setModalIsOpenToFalse} style={{float:"right", margin:"1% 1% 1% 1%"}}>Cancel</Button>
                    <Button variant="contained" color='inherit' style={{float:"right", margin:"1% 1% 1% 1%"}}>Submit</Button>
                </Modal>
                </div>
                
            </div>

            {page === "companyprofile" && <CompanyProfile />}

            <hr/>
            <div className='row'>
                <div className="row">
                    <div className="col" style={{float:"left"}}>
                        <h6>Priority/Accepted Tasks</h6>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <DetailedFeed />
                    </div>
                    <div className="col">
                        <DetailedFeed />
                    </div>
                    <div className="col">
                        <DetailedFeed />
                    </div>
                    <div className="col">
                        <DetailedFeed />
                    </div>
                </div>

                <hr/>
            </div>
        </div>
    )
}

export default Workspace
