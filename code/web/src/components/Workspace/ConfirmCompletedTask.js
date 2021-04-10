import React from 'react';
import DetailedTask from '../DetailedTask/DetailedTask';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';


const ConfirmCompletedTask = () => {
    const [tasks, setTasks] = useState([]);
    const [err, setErr] = useState(false);
    const mountedRef = useRef(true);

    const user = JSON.parse(localStorage.getItem('user'));
    const id = user ? user.id : 'null';

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_DATA_API}/task/tasker/confirm/${id}`)
            .then((response) => {
                setTasks(response.data);
                setErr(false);
            })
            .catch(err => {
                setErr(true);
                console.log(err);
            });
        return () => {
            mountedRef.current = false
        }
    }, []);

    return (
        <div>
            {tasks.length != 0 &&
            <div className="" style={{marginLeft:'7%', marginRight:'7%'}}>
                <div className='row'>
                    <hr/>
                    <div className="row">
                        <div className="col" style={{float:"left"}}>
                            <h6>Confirmation Required</h6>
                        </div>
                    </div>

                    <div className="row">
                        {!err && tasks.map((task) => (<DetailedTask key={task.id}
                                                                workerID={task.workerID}
                                                                taskID={task.id}
                                                                status={task.status}
                                                                typeID={task.typeID}
                                                                name={task.title}
                                                                price={task.price}
                                                                description={task.description}
                                                                address={task.address}
                                                                deadline={(task.datePosted)}
                                                                email={task.email}
                                                                phone={task.phone}
                                                                img={task.img}
                                                                status={task.status}
                                                                address={task.address}
                                                                taskMode="confirm"
                                                            />))}
                    </div>
                    <hr/>
                </div>
            </div>}
        </div>
    )
}

export default ConfirmCompletedTask
