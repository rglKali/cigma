import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";


export type LoadingProps = {}

const Loading: React.FC<LoadingProps> = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h3" gutterBottom>
        Loading...
      </Typography>
      <CircularProgress />
    </Box>
  )
}

export default Loading;
