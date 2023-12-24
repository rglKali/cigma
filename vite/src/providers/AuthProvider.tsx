import React, { ReactNode, useState, useEffect } from 'react';
import AuthContext, { AuthContextProps } from '../context/authContext';


export type AuthProviderProps = {
    children?: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))

  useEffect(() => {
    const ping = async (token: string) => {
      const response = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({token, op: 'ping'}),
      })

      if (response.status == 401) {
        localStorage.removeItem('token')
      }

      setToken(localStorage.getItem('token'))
    }

    if (token !== null) ping(token)
  }, [])

  const register = async (username: string, email: string, password: string) => {
		const response = await fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({op: 'register', data: {username, email, password}}),
    })

    const token = await response.json()
		if (response.status === 201) {
			localStorage.setItem('token', token.data)
      setToken(token.data)
		} else {
      throw new Error(token.message)
    }
  };

  const login = async (email: string, password: string) => {
		const response = await fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({op: 'login', data: {email, password}}),
    })

    const token = await response.json()
		if (response.status === 200) {
			localStorage.setItem('token', token.data)
      setToken(token.data)
		} else {
      throw new Error(token.message)
    }
  };

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  const authContextValue: AuthContextProps = {
    token,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
