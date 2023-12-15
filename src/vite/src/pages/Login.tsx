// Login.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, Typography, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const nav = useNavigate()

  const handleLogin = async () => {
    fetch('/api/auth/login', {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password})
    }).then(resp => {
      return resp.json();
    }).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        localStorage.setItem('logged', 'true')
        nav('/app/')
      }
    }).catch(error => {
      alert(error)
    });
    setEmail('');
    setPassword('');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: '400px', p: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        {error ? <Typography variant="h6" align="center" gutterBottom color="error">
          {error}
        </Typography> : null}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              required
              value={email}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={password}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
            >
              Login
            </Button>
          </Grid>
        </Grid>
        <Typography variant="body1" align="center" style={{ marginTop: '20px' }}>
          Don't have an account?{' '}
          <Link to="/app/register">Register here</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
