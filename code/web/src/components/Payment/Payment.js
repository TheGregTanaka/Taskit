import React from 'react';

import Form from './Form';
import CheckoutCard from './CheckoutCard';

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51IcvzIJt6QCCB8rY7FDWCLFodiT0HYnNaAOy5ukVwyZO9lKt5b7uMMjEbHZj2E8kR43rhL0QejGF3byQR29hBYRE00omTZyH79");

const Payment = ({workerID, taskID, typeID, 
                    name, price, description, 
                    status, email, phone,
                    address, city, state, zip, country}) => {
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
                    <Elements stripe={stripePromise}>
                        <Form amount={price} taskID={taskID}/>
                    </Elements>
                </div>
            </div>
            
        </div>
    )
}

export default Payment
