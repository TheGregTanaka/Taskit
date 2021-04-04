import React from 'react';
import DetailedTask from '../DetailedTask/DetailedTask'
import { useEffect, useState } from 'react';
import axios from 'axios';

const MyTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [err, setErr] = useState(false);

    const user = JSON.parse(localStorage.getItem('user'));
    const id = user ? user.id : 'null';

    useEffect(() => {
        axios.get(`http://localhost:3200/task/tasker/${id}`)
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
                            <h6>My Created Tasks</h6>
                        </div>
                    </div>

                    <div className="row">
                        {!err && tasks.map((task) => (<DetailedTask key={task.id}
                                                                name={task.title}
                                                                price={task.offeredPrice}
                                                                description={task.description}
                                                                location={""}
                                                                deadline={(task.datePosted)}
                                                                email={task.email}
                                                                phone={task.phone}
                                                                status={task.status}
                                                                taskMode="delete"
                                                            />))}
                    </div>
                    <hr/>
                </div>
            </div>
            
        </div>
    )
}

export default MyTasks
