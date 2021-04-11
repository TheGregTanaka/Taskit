import React, { useState } from 'react';
import axios from 'axios';

import { CardElement, injectStripe, ReactStripeElements  } from 'react-stripe-elements';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';


const Form = (props) => {
    const [card, setCard] = useState({
        email: "",
        amount: "",
    });

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            let token = await props.stripe.createToken({ name: card.name });
            console.log(token);

            axios.post(`${process.env.REACT_APP_DATA_API}/payment/donate`, {token, card})
                .then((response) => {
                    console.log(response.data);
                }, (error) => {
                    console.log(error);
                });
        } catch(e) {
            throw e;
        }
    };

    return (
        <div>
            <Paper>
            <main className="container" style={{marginTop:"10%"}}>
                <form onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input 
                        type="email"
                        value={card.email}
                        onChange={e => setCard({...card, email: e.target.value})}
                        placeholder="Email"
                        required
                    />
                    <label>Amount</label>
                    <input 
                        type="text"
                        value={card.amount}
                        onChange={e => setCard({...card, amount: e.target.value})}
                        required
                    />
                    <label>CC Number -- Exp. Date -- CVC</label>
                    <CardElement />
                    <Button type="submit">Charge It!</Button>
                </form>
            </main>
            </Paper>
        </div>
    )
}

export default injectStripe(Form);