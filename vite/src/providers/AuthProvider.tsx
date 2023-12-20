import React, { useState, ReactNode, useEffect } from 'react';
import AuthContext, { AuthContextProps } from '../context/AuthContext';
import api from '../utils/api';


export type AuthProviderProps = {
    children?: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [caller, setCaller] = useState<string | null>(localStorage.getItem('caller'));
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await api({caller, op: 'me'})
      setUser(response?.data)
    }

    if (caller) {
      fetchUser()
    }

    return () => {}
  })

  const register = async (username: string, email: string, password: string) => {
		const response = await api({op: 'register', data: {username, email, password}})

		if (response?.code === 201) {
			localStorage.setItem('caller', response?.data.id)
      setUser(response?.data.user)
			setCaller(response?.data.caller)
		}
    return response;
  };

  const login = async (email: string, password: string) => {
		const response = await api({op: 'login', data: {email, password}})

		if (response?.code === 200) {
			localStorage.setItem('caller', response?.data.id)
      setUser(response?.data.user)
			setCaller(response?.data.caller)
		}
    return response;
  };

  const logout = () => {
		if (caller !== null) {
			localStorage.removeItem('caller')
			setCaller(null)
		}
  };

  const authContextValue: AuthContextProps = {
    caller,
    user,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;