import React from 'react';
import DetailedTask from '../DetailedTask/DetailedTask';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from "@material-ui/core/Typography";

import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import './style.css';

const PendingPayment = () => {
    const [tasks, setTasks] = useState([]);
    const [err, setErr] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const mountedRef = useRef(true);

    const user = JSON.parse(localStorage.getItem('user'));
    const id = user ? user.id : 'null';

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_DATA_API}/task/tasker/pendingPayment/${id}`)
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
        <div style={{marginBottom:"1vh", marginLeft:'6%', marginRight:'6%'}}>
            {tasks.length != 0 &&
            <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
                style={{backgroundColor:"#1d2026"}}
            >
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                style={{backgroundColor:"white"}}
                >
                <Typography>Payment Required</Typography>
                <NotificationImportantIcon className="flicker" style={{color:"red"}}/>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="row">
                        {!err && tasks.slice(0).reverse().map((task) => (<DetailedTask key={task.id}
                                                                workerID={task.workerID} taskID={task.id} typeID={task.typeID}
                                                                name={task.title} price={task.price} description={task.description}
                                                                status={task.status} email={task.email} phone={task.phone}
                                                                taskMode="pay"
                                                                address={task.address} city={task.city} state={task.state} zip={task.zip} country={task.country}
                                                            />))}
                    </div>
                </AccordionDetails>
            </Accordion>}
        </div>
    )
}

export default PendingPayment
