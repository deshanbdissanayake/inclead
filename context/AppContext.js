// AppContext.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  isLoading: true,
  setIsLoading: () => {}
});

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    checkLoggedIn()
  },[])

  const checkLoggedIn = async () => {
    try {
      let res = await AsyncStorage.getItem('userdata');
      
      if(res){
        let userdata = JSON.parse(res);
        if(userdata.username){
          setIsLoggedIn(true);
        }
      }
    } catch (error) {
      console.error('Error at login screen async get: ', error);
    }
  }  

  return (
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn, isLoading, setIsLoading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
