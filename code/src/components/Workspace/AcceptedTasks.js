// import DetailedTask from '../DetailedTask/DetailedTask'
import DetailedFeed from './DetailedFeed'                // Dummy feed


const AcceptedTasks = () => {
    return (
        <div>
            <div className='row'>
                <hr/>
                <div className="row">
                    <div className="col" style={{float:"left"}}>
                        <h6>Priority/Accepted Tasks</h6>
                    </div>
                </div>

                <div className="row">
                    <div className="col" style={{marginBottom:'1%'}}>
                        <DetailedFeed />
                    </div>
                    <div className="col" style={{marginBottom:'1%'}}>
                        <DetailedFeed />
                    </div>
                    <div className="col" style={{marginBottom:'1%'}}>
                        <DetailedFeed />
                    </div>
                    <div className="col" style={{marginBottom:'1%'}}>
                        <DetailedFeed />
                    </div>
                </div>

                <hr/>
            </div>
        </div>
    )
}

export default AcceptedTasks
