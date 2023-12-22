import { createContext } from 'react';
import { Response } from '../utils';


export type User = {
  name: string,
  uav: number,
}


export type AuthContextProps = {
  jwt: string | null;
  user: User | null;
  register: (username: string, email: string, password: string) => Promise<Response>;
  login: (email: string, password: string) => Promise<Response>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export default AuthContext;
