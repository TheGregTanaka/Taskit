import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import { Button, Card } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";


const Form = (props) => {
    const api = process.env.REACT_APP_DATA_API;
    const userInfo = JSON.parse(localStorage.getItem('user'));
    const id = userInfo ? userInfo.id : 'null';
    const [user, setUser] = useState([]);
    const mountedRef = useRef(true);
    useEffect(() => {
        axios.get(`${api}/user/${id}`)
        .then((response) => {
            setUser(response.data[0]);
        })
        .catch(err => {
            console.log(err);
        })
        return () => {
            mountedRef.current = false
        }
    }, []);


    // Set notification bar
    const [notify, setNotify] = useState(false);
    const [notifyMsg, setNotifyMsg] = useState({
        severity: "success",
        message: ""
    });

    const handleClick = () => { setNotify(true); };
    const handleClose = () => { setNotify(false); };

    

    // Stripe Process
    const [isProcessing, setProcessingTo] = useState(false);
    
    const elements = useElements();
    const stripe = useStripe();

    const handleSubmit = async(e) => {
        e.preventDefault();

        const billingDetails = {
            name: user.name,
            email: user.email,
            address: {
              city: e.target.city.value,
              line1: e.target.address.value,
              state: e.target.state.value,
              postal_code: e.target.zip.value
            }
        };
        setProcessingTo(true);

        const { data: clientSecret } = await axios.post(`${process.env.REACT_APP_DATA_API}/payment`, {
            amount: props.amount * 100
        });

        const cardElement = elements.getElement(CardElement);

        const paymentMethodReq = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: billingDetails,
        });

        const confirmCardPayment = await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethodReq.paymentMethod.id,
        });

        console.log(confirmCardPayment);

        setNotifyMsg({severity:"success", message:"Payment Confirmed!"});
        setNotify(true);
    };

    const cardElementOptions = {
        hidePostalCode: true,
    }

    return (
        <div className="">
            <Snackbar open={notify} autoHideDuration={5000} onClose={handleClose} >
                <Alert elevation={6} variant="filled" severity={notifyMsg.severity}> 
                {notifyMsg.message}
                </Alert>
            </Snackbar>
            <Paper style={{width:"35vw"}}>
                <main className="" style={{marginTop:"1%", padding:"10px"}}>
                    <form onSubmit={handleSubmit}>
                        <label style={{fontSize:"20px"}}>Hello, {user.name}</label><br/><hr/><br/>
                        <label style={{fontSize:"15px"}}>Email: {user.email}</label><br/><br/>

                        <label htmlFor="address">Address</label>
                        <input name="address" type="text" required />

                        <div className="row">
                            <div className="col">
                                <label htmlFor="city">City</label>
                                <input name="city" type="text" required />
                            </div>
                            <div className="col">
                                <label htmlFor="state">State</label>
                                <input name="state" type="text" required />
                            </div>
                            <div className="col">
                                <label htmlFor="zip">Zip</label>
                                <input name="zip" type="text" required />
                            </div>
                        </div>

                        <label>CC Number -- Exp. Date -- CVC</label>
                        <div style={{padding:"10px", border:"1px solid #000", borderRadius:"25px"}}>
                            <CardElement options={cardElementOptions} />
                        </div>
                        <br/>

                        <Button disabled={isProcessing || !stripe} variant="contained" color="inherit" type="submit">
                            {isProcessing ? "Processing..." : `Pay $${props.amount}`}
                        </Button>
                    </form>
                </main>
            </Paper>
        </div>
    )
}

export default Form;
