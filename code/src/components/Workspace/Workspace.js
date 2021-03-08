import React from 'react'
// import DetailedTask from '../DetailedTask/DetailedTask'
import DetailedFeed from './DetailedFeed'                // Dummy feed

const Workspace = () => {
    return (
        <div>
            <div className="row">
                <div className="col" style={{float:"left"}}>
                    <button>View Company Profile</button>
                </div>
                <div className="col" style={{float:"right"}}>
                    <button>Create Tasks</button>
                </div>
                
            </div>

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
    )
}

export default Workspace
