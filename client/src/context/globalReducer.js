import { useReducer } from "react";

const initialState = {
    user: null,
};

export const GlobalActions = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
};

const globalReducer = (state, action) => {
    switch (action.type) {
        case GlobalActions.LOGIN:
            return {
                ...state,
                user: action.payload,
            };
        case GlobalActions.LOGOUT:
            return {
                ...state,
                user: null,
            };
        default:
            return state;
    }
};

export const useGlobalReducer = (obj = {}) =>
    useReducer(globalReducer, { ...initialState, obj });

export default globalReducer;
