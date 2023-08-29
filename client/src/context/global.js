"use client";
import { createContext, useContext } from "react";
import { GlobalActions, useGlobalReducer } from "./globalReducer";

export const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useGlobalReducer();

    return (
        <GlobalContext.Provider value={{ state, dispatch, GlobalActions }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContext;
