'use client';

import { useState, useCallback, useEffect } from "react";
import { createContext, useContext } from 'react';

const AuthContext = createContext(null);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
  const [metamaskData, setMetamaskData] = useState(JSON.parse(typeof window !== 'undefined' ? window.localStorage.getItem("metamask_data"): false));
  const [xverseData, setXverseData] = useState(JSON.parse(typeof window !== 'undefined' ? window.localStorage.getItem("xverse_data"): false));
  
  function setAuthMetamask(data) {
    typeof window !== 'undefined' ? window.localStorage.setItem("metamask_data", JSON.stringify(data)) : false;
    setMetamaskData(data)
  }

  function setAuthXverse(data) {
    typeof window !== 'undefined' ? window.localStorage.setItem("xverse_data", JSON.stringify(data)) : false;
    setXverseData(data)
  }

  function getProfile(){
    if (metamaskData) {
	let address = metamaskData.signer.address;
	return `${address.substr(0, 5)}...${address.substr(address.length - 4, address.length)}`;
    }
    if (xverseData) {
        let address = xverseData.pubKey1;
        return `0x${address.substr(0, 5)}...${address.substr(address.length - 4, address.length)}`;
    }
  }
  
  return (
    <AuthContext.Provider value={{metamaskData, xverseData, setAuthMetamask, setAuthXverse, getProfile}}>
      {children}
    </AuthContext.Provider>
  )
}
