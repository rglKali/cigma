import React, { useState, useMemo, SyntheticEvent } from "react";
import { useAuth } from "../hooks";
import { Button, Container, Box, Typography, TextField, Tabs, Tab } from "@mui/material";

type FormProps = {}

const LoginForm: React.FC<FormProps> = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [error, setError] = useState<string | null>(null)
	const { login } = useAuth()

	const handleLogin = async (e: SyntheticEvent) => {
		e.preventDefault()
		setError(null)
    try {
      await login(email, password)

    } catch (error: any) {
      setError(error.message as string)
    }
	}

	return (
		<Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
				{error === null ? null : <Typography variant="h6" color="error">
					{error}
				</Typography>}
        <Box
          component="form"
          sx={{
            width: '100%',
            mt: 1,
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mail"
            name="email"
						type="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
	)
};

const RegisterForm: React.FC<FormProps> = () => {
	const [username, setUsername] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [error, setError] = useState<string | null>(null)
	const { register } = useAuth();

	const handleRegister = async (e: SyntheticEvent) => {
		e.preventDefault()
		setError(null)
    try {
      await register(username, email, password)
    } catch (error: any) {
      setError(error.message as string)
    }
	}

	return (
		<Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
				{error === null ? null : <Typography variant="h6" color="error">
					{error}
				</Typography>}
        <Box
          component="form"
          sx={{
            width: '100%',
            mt: 1,
          }}
          noValidate
          autoComplete="off"
        >
					<TextField
						margin="normal"
						required
						fullWidth
						id="username"
						label="Username"
						name="username"
						type="text"
						autoFocus
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mail"
            name="email"
						type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleRegister}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
	)
};


export type AuthPageProps = {}


const AuthPage: React.FC<AuthPageProps> = () => {
	const [selectedTab, setSelectedTab] = useState<number>(0);

	const handleTabChange = (event: SyntheticEvent, newValue: number) => {
		console.log(event)
		setSelectedTab(newValue);
	};

	const content = useMemo(() => {
		switch (selectedTab) {
			case 0: return <LoginForm />
			case 1: return <RegisterForm />
			default: return null;
		}
	}, [selectedTab])

	return (
    <>
      <Tabs value={selectedTab} onChange={handleTabChange} centered variant="fullWidth">
        <Tab label="Login" />
        <Tab label="Register" />
      </Tabs>
      {content}
    </>
	);
};

export default AuthPage;