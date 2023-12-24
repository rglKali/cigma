import { createContext } from 'react';


export type AuthContextProps = {
  token: string | null
  register: (username: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export default AuthContext;
