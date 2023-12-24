import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Loading from '../components/Loading';
import { useAuth } from '../hooks';

type User = {
  name: string,
  balance: number
}

type ProfilePageProps = {}


const ProfilePage: React.FC<ProfilePageProps> = () => {
	const [ user, setUser ] = useState<User | null>(null);
  const { token, logout } = useAuth()

	useEffect(() => {
		const getUser = async () => {
			const response = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({token, op: 'get_profile'}),
      })
      const data = await response.json()
			setUser(data.data)
		}

		getUser()
	}, [])

	if (user === null) return <Loading/>

	return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant='h3'>Logged in as {user.name}</Typography>
      <br/>
      <Typography variant='h3'>Balance: {user.balance} UAV</Typography>
      <Button onClick={logout}>Logout</Button>
    </Box>
	)
};

export default ProfilePage;
