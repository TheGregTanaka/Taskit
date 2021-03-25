import DetailedTask from '../DetailedTask/DetailedTask'
// import DetailedFeed from './DetailedFeed'                // Dummy feed
import { useEffect, useState } from 'react';
import axios from 'axios';

const AcceptedTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [err, setErr] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:3200/task")
            .then((response) => {
                setTasks(response.data);
                setErr(false);
                console.log("Tasks Res: ", response.data);
            })
            .catch(err => {
                setErr(true);
                console.log(err);
            });
    }, []);

    return (
        <div>
            <div className="" style={{marginLeft:'7%', marginRight:'7%'}}>
                <div className='row'>
                    <hr/>
                    <div className="row">
                        <div className="col" style={{float:"left"}}>
                            <h6>Priority/Accepted Tasks</h6>
                        </div>
                    </div>

                    <div className="row">
                        {!err && tasks.map((task) => (<DetailedTask 
                                                                name={task.title}
                                                                price={task.offeredPrice}
                                                                description={task.description}
                                                                location={""}
                                                                deadline = {(task.datePosted)}
                                                                email = {"XXX@gmail.com"}
                                                                phone = {'XXX-XXX-XXXX'}
                                                            />))}
                    </div>
                    <hr/>
                </div>
            </div>
            
        </div>
    )
}

export default AcceptedTasks
