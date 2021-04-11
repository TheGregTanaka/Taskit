import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const Notification = () => {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => { setOpen(true); };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    return (
        <div style={{color:"white"}}>
            <Button variant="outlined" onClick={handleClick}>
                Open success snackbar
            </Button>
            <Snackbar open={open} autoHideDuration={100000} onClose={handleClose} >
                <Alert elevation={6} variant="filled" severity="success" onClose={handleClose} > 
                    This is a success message!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Notification
