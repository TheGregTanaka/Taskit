import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Avater, Box, Checkbox, Container, Grid, Link } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import './Login.css';

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

async function loginUser(credentials) {
  const api = process.env.REACT_APP_DATA_API;
  let response = await axios.post(api + '/login', {
    email: credentials.email,
    password: credentials.password
  })
  .then(function (res) {
    return {data: res.data, error: null};
  })
  .catch(function (err) {
    return {data: null, error: err.response};
  });
      
  return response;
}

//class Login extends React.Component {
export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const classes = useStyles();
  const history = useHistory();
  const userData = JSON.parse(localStorage.getItem('user'));
  const handleSubmit = async e => {
    e.preventDefault();
    const user = await loginUser({email, password});
    if (user.data) {
      localStorage.setItem('user', JSON.stringify(user.data));
      history.push("/feed");
    } else {
      setError(user.error);
    }
  }
  return (
<Container component="main" maxWidth="xs" style={{backgroundColor: "white", marginCenter:'3%'}} >
<CssBaseline />
<div className={classes.paper}>
  { error && <Alert severity="error"> { error.data } </Alert> }
<Typography variant="h5" color="textPrimary"> Sign In with your TaskIT Credentials</Typography>
  <form className={classes.form} noValidate onSubmit={handleSubmit}>
    <Grid container spacing={2}>
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
          onChange={(e) => {setEmail(e.target.value)}}
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
          onChange={(e) => {setPassword(e.target.value)}}
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
    >
    <Typography color='textPrimary'>SUBMIT</Typography>
    </Button>
    <Grid container justify="flex-end">
      <Grid item>
      </Grid>
    </Grid>
  </form>
</div>
<Box mt={5}>
</Box>
</Container>
);  
}

