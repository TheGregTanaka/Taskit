import React, { useState} from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
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
  console.log(credentials);
  //TODO put api in env var
  const api = "http://localhost:3200";
  axios.post(api + '/login', {
    email: credentials.email,
    password: credentials.password
  })
  .then(function (res) {
    console.log(res);
  })
  .catch(function (err) {
    console.log(err);
  });
      
  let json = {
    "token": "aoeuhjkl"
  };
  return json;
}

export default function Login({ setToken, loggedIn }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const classes = useStyles();
  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({email, password});
    setToken(token);
  }
  if (loggedIn) {
    return (<Redirect to="/dashboard" />);
  } else {
    return (
<Container component="main" maxWidth="xs" style={{backgroundColor: "white", marginCenter:'3%'}} >
<CssBaseline />
<div className={classes.paper}>
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
    <Typography color='#ffffff'>SUBMIT</Typography>
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
}


Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
