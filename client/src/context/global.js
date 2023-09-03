"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { GlobalActions, useGlobalReducer } from "./globalReducer";
import Loading from "@/app/(dashboard)/loading";
import { getUser } from "@/api/auth";

export const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useGlobalReducer();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            getUser(token).then((result) => {
                if (result?.ok) {
                    dispatch({
                        type: GlobalActions.LOGIN,
                        payload: result.user,
                    });
                    dispatch({
                        type: GlobalActions.SET_TOKEN,
                        payload: token,
                    });
                }
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <GlobalContext.Provider value={{ state, dispatch, GlobalActions }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContext;
