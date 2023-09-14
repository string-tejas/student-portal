import { useReducer } from "react";

const initialState = {
    user: null,
    token: null,
    courses: null,
    toast: {
        message: "",
        type: "",
    },
};

export const GlobalActions = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
    SET_TOKEN: "SET_TOKEN",
    SET_TOAST: "SET_TOAST",
    SET_COURSES: "SET_COURSES",
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
        case GlobalActions.SET_TOKEN:
            return {
                ...state,
                token: action.payload,
            };

        case GlobalActions.SET_TOAST:
            return {
                ...state,
                toast: action.payload,
            };

        case GlobalActions.SET_COURSES:
            return {
                ...state,
                courses: action.payload,
            };

        default:
            return state;
    }
};

export const useGlobalReducer = (obj = {}) =>
    useReducer(globalReducer, { ...initialState, obj });

export default globalReducer;
