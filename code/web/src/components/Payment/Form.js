import React, { useState } from 'react';
import axios from 'axios';

import { CardElement, injectStripe  } from 'react-stripe-elements';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';


const Form = (props) => {
    const [card, setCard] = useState({
        name: "",
        email: "",
        amount: "",
    });

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            let token = await props.stripe.createToken({ name: card.mail });
            console.log(token);

            axios.post(`${process.env.REACT_APP_DATA_API}/payment`, {token, card})
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
                        <label>Name</label>
                        <input 
                            type="text"
                            value={card.name}
                            onChange={e => setCard({...card, name: e.target.value})}
                            placeholder="Name"
                            required
                        />
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
                        <div style={{padding:"10px", border:"1px solid #000", borderRadius:"25px"}}>
                            <CardElement />
                        </div>
                        <br/>
                        <Button variant="contained" color="inherit" type="submit">Charge It!</Button>
                    </form>
                </main>
            </Paper>
        </div>
    )
}

export default injectStripe(Form);
