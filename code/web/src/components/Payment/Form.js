import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import { CardElement, injectStripe  } from 'react-stripe-elements';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import Typography from "@material-ui/core/Typography";

const Form = (props) => {
    const api = process.env.REACT_APP_DATA_API;
    const [error, setError] = useState(false);
    const [notify, setNotify] = useState(false);
    const [notifyMsg, setNotifyMsg] = useState({
        severity: "success",
        message: ""
    });
    const handleClose = () => { setNotify(false); };

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


    const [card, setCard] = useState({
        name: "Firstname Lastname",
        email: user.email,
        amount: props.amount,
    });

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try {
            let token = await props.stripe.createToken({ name: card.email });

            axios.post(`${api}/payment`, {token, card})
                .then((response) => {
                    // console.log(response.data[0]);
                    setError(false);
                })
                .catch(err => {
                    setError(true);
                })
                setNotifyMsg({severity:"success", message:"Payment Confirmed!"});
                window.location.reload();
        } catch(e) {
            setNotifyMsg({severity:"error", message:"Payment not Confirmed!"});
            setError(true);
            throw e;
        }
        setNotify(true);
        
        if(!error) {
            axios.patch(`${api}/task/${props.taskID}`, {
                data: { statusID: 5}
              })
              .then( 
                    console.log("Successfully changed statusID(4 -> 5)")
                )
        }
        console.log(props.taskID)
    };

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
                        <label>CC Number -- Exp. Date -- CVC</label>
                        <div style={{padding:"10px", border:"1px solid #000", borderRadius:"25px"}}>
                            <CardElement />
                        </div>
                        <br/>
                        <Button variant="contained" color="inherit" type="submit">Pay ${props.amount}</Button>
                    </form>
                </main>
            </Paper>

            
        </div>
    )
}

export default injectStripe(Form);
