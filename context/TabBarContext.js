import React, { createContext, useContext, useState } from 'react';

const TabBarContext = createContext();

export  const TabBarProvider = ({ children }) => {
  const [tabBarVisible, setTabBarVisible] = useState(true);

  return (
    <TabBarContext.Provider value={{ tabBarVisible, setTabBarVisible }}>
      {children}
    </TabBarContext.Provider>
  );
};

export const useTabBarVisibility = () => { return useContext(TabBarContext) };