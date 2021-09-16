import React, { useContext, useEffect, useState } from 'react'
import devices from '../apis/devices'

export interface PropsTypes {
    children: React.ReactNode
}

const AuthContext = React.createContext(undefined)

export function useAuth() {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }: PropsTypes) => {
    const [currentUser, setCurrentUser] = useState()

    const login = (values) => {
        return devices.post('/login', values);
    } 

    const logout = () => {
        localStorage.removeItem('currentUser')
        setCurrentUser(null);
        return 'user logout'
    }

    useEffect(() => {
      if (localStorage.getItem('currentUser')) {
        const parseItem = JSON.parse(localStorage.getItem('currentUser'))
        const now = new Date()
        if (now.getTime() > parseItem.expiry) 
          localStorage.removeItem('currentUser')
        else 
          setCurrentUser(parseItem.user)
      }
    }, [])

    const value = { currentUser, setCurrentUser, login, logout }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    ) 
}