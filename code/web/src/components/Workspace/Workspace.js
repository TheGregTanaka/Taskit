import { Button } from '@material-ui/core';
import React, { useState } from 'react'

import AcceptedTasks from './AcceptedTasks'
import CompanyProfile from '../CompanyProfile/CompanyProfile'
import CreateTask from '../CreateTask/CreateTask'

const Workspace = () => {
    // Display Company Profile
    const [page, setPage] = useState("displayAcceptedTasks");
    
    return (
        <div className=''>
            <div className="row" style={{marginTop:"0"}}>
                <div style={{marginLeft:'7%', marginRight:'7%'}}>
                    <div className="col" style={{float:"left"}}>
                        {page === "displayAcceptedTasks" && <Button variant="contained" color="inherit" onClick={() => setPage("companyprofile")}>View Company Profile</Button>}
                    </div>
                    <div style={{width:"60vw"}}></div>
                    
                    <div className="col" style={{float:"right"}}>
                        {page === "companyprofile" && <Button variant="contained" color="inherit" onClick={() => setPage("displayAcceptedTasks")} >Close View</Button>}
                    </div>
                </div>
                
                <div className="col" style={{float:"right"}}>
                    {page === "displayAcceptedTasks" && <CreateTask/>}
                </div>
            </div>
            {page === 'displayAcceptedTasks' && <AcceptedTasks />}
            {page === "companyprofile" && <CompanyProfile />}
        </div>
    )
}
export default Workspace
