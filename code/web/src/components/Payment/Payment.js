import React from 'react';
import {StripeProvider, Elements  } from 'react-stripe-elements';
import Form from './Form';


import CheckoutCard from './CheckoutCard';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';



const Payment = ({workerID, taskID, typeID, 
                    name, price, description, 
                    status, email, phone,
                    address, city, state, zip, country}) => {
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
                <div className="col" style={{marginTop:"1vh"}}>
                    <CheckoutCard
                        workerID={workerID} taskID={taskID} typeID={typeID}
                        name={name} price={price} description={description}
                        status={status} email={email} phone={phone}
                        taskMode=""
                        address={address} city={city} state={state} zip={zip} country={country}
                    />
                </div>
                <div className="col">
                    <StripeProvider apiKey="pk_test_51IcvzIJt6QCCB8rY7FDWCLFodiT0HYnNaAOy5ukVwyZO9lKt5b7uMMjEbHZj2E8kR43rhL0QejGF3byQR29hBYRE00omTZyH79">
                        <Elements>
                            <Form amount={price} taskID={taskID}/>
                        </Elements>
                    </StripeProvider>
                </div>
            </div>
            
        </div>
    )
}

export default Payment
