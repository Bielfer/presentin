import React, { Dispatch, SetStateAction, useContext } from 'react';

interface ContextType {
  tab: string;
  setTab: Dispatch<SetStateAction<string>>;
  activeStyles: string;
}

export const TabsContext = React.createContext({} as ContextType);

export const useTabNavigation = () => useContext(TabsContext);
