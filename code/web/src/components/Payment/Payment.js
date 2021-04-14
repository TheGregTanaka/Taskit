import React from 'react';
import axios from 'axios';
import Form from './Form';
import CheckoutCard from './CheckoutCard';
import Box from '@material-ui/core/Box';
import { useEffect, useState, useRef } from 'react';

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Payment = ({workerID, taskID, typeID, 
                    name, price, description, 
                    status, email, phone,
                    address, city, state, zip, country}) => {
        const [worker, setWorker] = useState([]);
        const mountedRef = useRef(true);
        useEffect(() => {
            axios.get(`${process.env.REACT_APP_DATA_API}/user/${workerID}`)
                .then((response) => {
                    setWorker(response.data);
                })
                .catch(err => {
                    console.log(err);
                });
            return () => {
                mountedRef.current = false
            }
        }, []);
        
    return (
        <div>
            <Box style={{maxHeight: '49vh', overflow: 'auto', maxWidth:'auto', height:"49vh"}}>
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
                        <Elements stripe={stripePromise}>
                            <Form amount={price} taskID={taskID} worker={worker} />
                        </Elements>
                    </div>
                </div>
            </Box>
        </div>
    )
}

export default Payment
