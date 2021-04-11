import React, { useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { render } from "react-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
/*import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';*/
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router';
import axios from 'axios';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { Redirect } from "react-router-dom"; 

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

async function registerUser(field) {
  const api = process.env.REACT_APP_DATA_API;
  const repsonse = await axios.post(api + '/registration', {
    name: field.name,
    email: field.email,
    password: field.password
  })
  .then(function (res) {
    return {data:res.data, err:null};
  })
  .catch(function (err) {
    return {data: null, err:err.response};
  })
  
  return repsonse; 

}


export default function Registration() {
  const classes = useStyles();
  const [name, setName] = useState();
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [error, setError] = useState();
  const history = useHistory();

  
  const data1 = async e => {
    e.preventDefault();
    const message = await registerUser({ name, email, password });
    console.log(message);
    if(message){
      history.push("/login");
    } else if (message.err.status == 403) {
      setError(message.err.data);
    } else {
      setError('something else!');
    }
   }
     return (
    <Container component="main" maxWidth="xs" style={{backgroundColor: "white", marginCenter:'3%'}} >
      <CssBaseline />
      <div className={classes.paper}>
       { error && <Alert severity="error" > { error } </Alert> }
      <Typography variant="h5" color="textPrimary"> Join the Commuinty for Free</Typography>
      {/*<Avatar alt="TaskIT" src="/Users/ManojYeddanapudy/sign_up/Taskit.jpg" className={classes.large} />*/}
        <form className={classes.form} noValidate onSubmit={data1}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="phone number"
                label="Phone number"
                type="phone number"
                id="phone number"
                autoComplete="number"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            /*className={classes.submit}*/
          >
            Register
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
      </Box>
    </Container>
  );
}


