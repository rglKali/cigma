import { createContext } from 'react';
import { Response } from '../utils';


export type AuthContextProps = {
  caller: string | null;
  user: string | null;
  register: (username: string, email: string, password: string) => Promise<Response>;
  login: (email: string, password: string) => Promise<Response>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export default AuthContext;
