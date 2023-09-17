import { useReducer } from "react";

const initialState = {
    user: null,
    token: null,
    courses: null,
    sevaCategories: null,
    sevaSelectedCategory: null,
    sevaCourses: null,
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
    SET_SEVA_CATEGORIES: "SET_SEVA_CATEGORIES",
    SET_SEVA_SELECTED_CATEGORY: "SET_SEVA_SELECTED_CATEGORY",
    SET_SEVA_COURSES: "SET_SEVA_COURSES",
    RESET_SEVA_SELECTED_CATEGORY: "RESET_SEVA_SELECTED_CATEGORY",
};

const globalReducer = (state, action) => {
    switch (action.type) {
        case GlobalActions.LOGIN:
            return {
                ...state,
                user: action.payload,
            };
        case GlobalActions.LOGOUT:
            return initialState;

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

        case GlobalActions.SET_SEVA_CATEGORIES:
            return {
                ...state,
                sevaCategories: action.payload,
            };
        case GlobalActions.SET_SEVA_SELECTED_CATEGORY:
            return {
                ...state,
                sevaSelectedCategory: action.payload,
            };

        case GlobalActions.SET_SEVA_COURSES:
            return {
                ...state,
                sevaCourses: action.payload,
            };

        case GlobalActions.RESET_SEVA_SELECTED_CATEGORY:
            return {
                ...state,
                sevaSelectedCategory: null,
                sevaCourses: null,
            };

        default:
            return state;
    }
};

export const useGlobalReducer = (obj = {}) =>
    useReducer(globalReducer, { ...initialState, obj });

export default globalReducer;
