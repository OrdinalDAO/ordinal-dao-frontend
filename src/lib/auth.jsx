'use client';

import { useState, useCallback, useEffect } from "react";
import { createContext, useContext } from 'react';

const AuthContext = createContext(null);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(JSON.parse(typeof window !== 'undefined' ? window.localStorage.getItem("user"): false));
  
  function setAuthUser(user) {
    typeof window !== 'undefined' ? window.localStorage.setItem("user", JSON.stringify(user)) : false;
    setUser(user);
  }

  function getProfile(){
    if (user) {
      if ("signer" in user) {
	let address = user.signer.address;
	return `${address.substr(0, 5)}...${address.substr(address.length - 4, address.length)}`;
      }
      if ("pubKey1" in user) {
	return `0x${user.pubKey1.substr(0, 5)}...${user.pubKey1.substr(user.pubKey1.length - 4, user.pubKey1.length)}`
      }
    }
  }
  
  return (
    <AuthContext.Provider value={{user, setAuthUser, getProfile}}>
      {children}
    </AuthContext.Provider>
  )
}
