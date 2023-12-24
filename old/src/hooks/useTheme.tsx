import { useContext } from "react";
import ThemeContext, { ThemeContextProps } from "../context/ThemeContext";

export default (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within an AuthTheme');
  }
  return context;
};
