import React, { useState, ReactNode, useMemo } from 'react';
import { createTheme, useMediaQuery, CssBaseline, ThemeProvider as Provider } from '@mui/material';
import ThemeContext from '../context/ThemeContext';


export type ThemeProviderProps = {
    children?: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(useMediaQuery('(prefers-color-scheme: dark)'));

  const theme = useMemo(() => createTheme({
    palette: { mode: darkMode ? 'dark' : 'light' }
  }), [darkMode]);

  const ThemeContextValue = {
    theme: darkMode ? "dark" : "light" as "dark" | "light",
    toggleTheme: () => setDarkMode(!darkMode),
  }

  return (
    <ThemeContext.Provider value={ThemeContextValue}>
      <Provider theme={theme}>
        <CssBaseline/>
        {children}
      </Provider>
    </ThemeContext.Provider>
  )
};

export default ThemeProvider;
