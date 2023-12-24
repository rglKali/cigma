import React, { useState, useMemo } from 'react';
import { useAuth } from '../hooks';
import { Box, Button } from '@mui/material';
import AuthModal from '../components/AuthModal';

type ProfilePageProps = {}


const ProfilePage: React.FC<ProfilePageProps> = () => {
  const [ modal, toggleModal ] = useState<boolean>(false)
  const { caller, user, logout } = useAuth()

  const authorized = useMemo(() => {
    if (caller !== null) {
      toggleModal(false)
    }
    return caller !== null
  }, [caller])

  const button = () => {
    if (!authorized) {
      return <Button onClick={() => toggleModal(true)}>Log in</Button>
    }
    return <Button onClick={() => logout()}>Log out</Button>
  }

  return (
    <Box>
      {authorized ? `Logged in as ${user}` : "Unathorized"}
      <br/>
      {button()}
      <AuthModal open={modal} close={() => toggleModal(false)}/>
    </Box>
  );
};

export default ProfilePage;
