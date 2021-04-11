import { Button } from '@material-ui/core';
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';

import MyTasks from './MyTasks';
import AcceptedTasks from './AcceptedTasks';
import ConfirmCompletedTask from './ConfirmCompletedTask';
import PendingPayment from './PendingPayment';
import CompanyProfile from '../CompanyProfile/CompanyProfile';
import CreateTask from '../CreateTask/CreateTask';

const Workspace = () => {
    // Display Company Profile
    const [page, setPage] = useState("displayWorkspace");
    const userData = JSON.parse(localStorage.getItem('user'));
    
  if (userData) {
    return (
        <div className=''>
            <div className="row" style={{marginTop:"0"}}>
                <div style={{marginLeft:'7%', marginRight:'7%'}}>
                    <div className="col" style={{float:"left"}}>
                        {page === "displayWorkspace" && <Button variant="contained" color="inherit" onClick={() => setPage("companyprofile")}>View Company Profile</Button>}
                    </div>
                    <div style={{width:"60vw"}}></div>
                    
                    <div className="col" style={{float:"right"}}>
                        {page === "companyprofile" && <Button variant="contained" color="inherit" onClick={() => setPage("displayWorkspace")} >Close View</Button>}
                    </div>
                </div>
                
                <div className="col" style={{float:"right"}}>
                    {page === "displayWorkspace" && <CreateTask/>}
                </div>
            </div>
            
            {page === 'displayWorkspace' && <PendingPayment />}
            {page === 'displayWorkspace' && <ConfirmCompletedTask />}
            {page === 'displayWorkspace' && <MyTasks />}
            {page === 'displayWorkspace' && <AcceptedTasks />}
            {page === 'companyprofile' && <CompanyProfile />}
        </div>
    )
  } else {
    return (<Redirect to="/login" />);
  }
}
export default Workspace
