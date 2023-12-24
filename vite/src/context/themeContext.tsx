import { createContext } from 'react';

export type ThemeContextProps = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextProps | null>(null);

export default ThemeContext;
