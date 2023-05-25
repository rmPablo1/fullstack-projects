import {createContext, useState} from "react"

export const UserContext = createContext()
export function UserProvider({children}){
  const [username, setUsername] = useState(undefined)
  const [userId, setUserId] = useState(undefined)
  const [isAuth, setIsAuth] = useState(false)
  const [token, setToken] = useState(undefined)

  const toShare = {
    username,
    userId,
    setUserId,
    setUsername,
    isAuth,
    setIsAuth,
    token,
    setToken
  }
  return <UserContext.Provider value={toShare}>
    {children}
  </UserContext.Provider>
}
