// Register.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, Typography, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const nav = useNavigate()

  const handleRegister = async () => {
    fetch('/api/auth/register', {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username, email, password})
    }).then(resp => {
      return resp.json();
    }).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        nav('/app/login')
      }
    }).catch(error => {
      alert(error)
    });
    setUsername('');
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
          Register
        </Typography>
        {error ? <Typography variant="h6" align="center" gutterBottom color="error">
          {error}
        </Typography> : null}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="User Name"
              type="text"
              variant="outlined"
              fullWidth
              required
              value={username}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setUsername(event.target.value);
              }}
            />
          </Grid>
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
              onClick={handleRegister}
            >
              Register
            </Button>
          </Grid>
        </Grid>
        <Typography variant="body1" align="center" style={{ marginTop: '20px' }}>
          Already have an account?{' '}
          <Link to="/app/login">Login here</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Register;
