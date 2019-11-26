import React, { useState } from "react";
import Layout from "../core/Layout";
import { signup } from "../auth";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  makeStyles,
  Container
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'

  },
  alert: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'right'

  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '110%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Signup = () => {
  const classes = useStyles();
  const [values, setValues] = useState({
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    address: '',
    phone: '',
    error: "",
    success: false
  });
  const {
    firstname,
    lastname,
    email,
    username,
    password,
    address,
    phone,
    success,
    error
  } = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({
      firstname,
      lastname,
      email,
      username,
      password,
      address,
      phone
    })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            firstname: "",
            lastname: "",
            email: "",
            username: "",
            password: "",
            address: "",
            phone: "",
            error: "",
            success: true
          });
        }
      });
  };

  const SignupForm = () => (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <form className={classes.form} noValidate>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={handleChange("firstname")}
              value={firstname}
              autoComplete="fname"
              variant="outlined"
              required
              fullWidth
              id="firstname"
              label="First Name"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={handleChange("lastname")}
              value={lastname}
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
              onChange={handleChange("email")}
              value={email}
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
              onChange={handleChange("username")}
              value={username}
              variant="outlined"
              required
              fullWidth
              name="username"
              label="Username"
              type="username"
              id="username"
              autoComplete="username"
            />

          </Grid>

          <Grid item xs={12}>
            <TextField
              onChange={handleChange("password")}
              value={password}
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
            <TextField
              onChange={handleChange("address")}
              value={address}
              variant="outlined"
              required
              fullWidth
              name="address"
              label="address"
              type="address"
              id="address"
              autoComplete="address"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={handleChange("phone")}
              value={phone}
              variant="outlined"
              required
              fullWidth
              name="phone"
              label="Phone"
              type="phone"
              id="phone"
              autoComplete="phone"
            />
          </Grid>
        </Grid>
        <Button
          onClick={clickSubmit}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign Up
        </Button>
        <Grid container justify="flex-end">
          <Grid item>

          </Grid>
        </Grid>
      </form>
    </Container>
  );

  const showError = () => (
    <div
      className="text "
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="text alert-info"
      style={{ display: success ? "" : "none" }}
    >
      New account is created. Please <Link to="/signin">Signin</Link>
    </div>
  );
  return (
    <Layout title="Signup" description="Signup ">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
              </Typography>
          {showSuccess()}
          {showError()}
          {SignupForm()}

          {/* {JSON.stringify(values)} */}
        </div>
      </Container>
    </Layout>
  );
};

export default Signup;