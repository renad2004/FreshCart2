import { createContext, useState } from 'react';

 export const TokenContext = createContext(localStorage.getItem('token'));

 function TokenProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));

  function logOut(){
     setToken(null)
     localStorage.removeItem('token')
  }

  return (
    <TokenContext.Provider value={{ token, setToken,logOut }}>
      {children}
    </TokenContext.Provider>
  );
}

export default TokenProvider;
