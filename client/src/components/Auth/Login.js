import React, { useState, useCallback } from "react";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { setToken } from '../../token'
import { LOGIN_MUTATION } from './login.mutation'
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom'

const Login = () => {
  const history = useHistory();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const [executeLogin] = useMutation(LOGIN_MUTATION);

  const login = useCallback(() => {
    executeLogin({ 
      variables: { 
        email: email,
        password: password
      } 
    }).then(({ data }) => {
        const token = data.loginUser && data.loginUser.token
        if (token) {
          // console.log(data.loginUser.user)
          setToken(token)
          history.push('/')
        } else {
          setError('Incorrect Email or Password')
        }
      });
  }, [executeLogin, history, email, password]);
    
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className="center">
        <img src="/newcroplogo.png" alt="logo" width={100} height={100}/>
        <Typography align="center" component="h1" variant="h5">
          Sign in
        </Typography>
        <div>
        {error && <p className="text-danger">{error}</p>}
        </div> 
        <form onSubmit={(e) => {login(); e.preventDefault();}}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={e => setPassword(e.target.value)}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        </form>         
      </div>
      <Box mt={8}>

      </Box>
    </Container>
  );
}

export default Login;
