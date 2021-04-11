import React from 'react';
import {StripeProvider, Elements  } from 'react-stripe-elements';
import Form from './Form';


import CheckoutCard from './CheckoutCard';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';



const Payment = () => {
    const [tasks, setTasks] = useState([]);
    const [err, setErr] = useState(false);
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
        <div>
            <div className="row">
                {!err && tasks.slice(0).reverse().map((task) => (<CheckoutCard key={task.id}
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
                                                        taskMode=""
                                                    />))}
            </div>
            <StripeProvider apiKey="pk_test_51IcvzIJt6QCCB8rY7FDWCLFodiT0HYnNaAOy5ukVwyZO9lKt5b7uMMjEbHZj2E8kR43rhL0QejGF3byQR29hBYRE00omTZyH79">
                <Elements>
                    <Form />
                </Elements>
            </StripeProvider>
        </div>
    )
}

export default Payment
