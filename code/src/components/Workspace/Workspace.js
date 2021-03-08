import React from 'react'
// import DetailedTask from '../DetailedTask/DetailedTask'
import DetailedFeed from './DetailedFeed'                // Dummy feed

const Workspace = () => {
    return (
        <div>
            <div className="row">
                {/* <div className="col">
                    <button></button>
                </div> */}
                <button>Add</button>
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
        </div>
    )
}

export default Workspace
