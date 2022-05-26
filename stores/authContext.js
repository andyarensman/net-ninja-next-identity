import { createContext, useState } from 'react';
import netlifyIdentity from 'netlify-identity-widget';

//global state for entire application
const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  authReady: false
})

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    //init netlify identity connection
    netlifyIdentity.init()
  }, [])

  return (
    <AuthContext.Provider value={user}>
      { children }
    </AuthContext.Provider>
  )
}

export default AuthContext;
