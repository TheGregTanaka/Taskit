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
  //TODO make call to node API
  
  let json = {
    "token": "aoeuhjkl"
  };
  return json;
}

export default function Login({ setToken, loggedIn }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const classes = useStyles();
  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({ username, password });
    setToken(token);
  }
  if (loggedIn) {
    return (<Redirect to="/dashboard" />);
  } else {
    return (
     /* <div className="container">
        <div className="row">
          <div className="col">
            <h1>Sign in with you <b>TaskIt</b> account</h1>
          </div>
          <div className="col">
            <div className="login-wrapper">
                <header>Login</header>
                <form onSubmit={handleSubmit}>
                  <label>
                    <p>Email</p>
                  <input type="text" 
                    placeholder="Email" 
                    onChange={e => setUserName(e.target.value)}/>
                  </label>
                  <label>
                    <p>Password</p>
                  <input type="password" 
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}/>
                  </label>
                  <div>
                    <button type="submit">Submit</button>
                  </div>
                </form>
              </div>
          </div>
        </div>
      </div>
*/
<Container component="main" maxWidth="xs" style={{backgroundColor: "white", marginCenter:'3%'}} >
<CssBaseline />
<div className={classes.paper}>
<Typography variant="h5" color="textPrimary"> Sign In with your TaskIT Credentials</Typography>
{/*<Avatar alt="TaskIT" src="/Users/ManojYeddanapudy/sign_up/Taskit.jpg" className={classes.large} />*/}
  <form className={classes.form} noValidate >
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
