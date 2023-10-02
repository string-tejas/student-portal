import { useReducer } from "react";

const initialState = {
    user: null,
    token: null,
    courses: null,
    teachers: null,
    enrolledCourses: null,
    sevaCategories: null,
    sevaSelectedCategory: null,
    sevaCourses: null,
    currentCourse: null,
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
    SET_CURRENT_COURSE: "SET_CURRENT_COURSE",
    RESET_CURRENT_COURSE: "RESET_CURRENT_COURSE",
    SET_ENROLLED_COURSES: "SET_ENROLLED_COURSES",
    ADD_ENROLLED_COURSE: "ADD_ENROLLED_COURSE",
    RESET_ENROLLED_COURSES: "RESET_ENROLLED_COURSES",
    SET_TEACHERS: "SET_TEACHERS",
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
        case GlobalActions.SET_CURRENT_COURSE:
            return {
                ...state,
                currentCourse: action.payload,
            };
        case GlobalActions.RESET_CURRENT_COURSE:
            return {
                ...state,
                currentCourse: null,
            };

        case GlobalActions.SET_ENROLLED_COURSES:
            return {
                ...state,
                enrolledCourses: action.payload,
            };

        case GlobalActions.ADD_ENROLLED_COURSE:
            return {
                ...state,
                enrolledCourses: [
                    ...state.enrolledCourses,
                    action.payload,
                ].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)),
            };

        case GlobalActions.RESET_ENROLLED_COURSES:
            return {
                ...state,
                enrolledCourses: null,
            };

        case GlobalActions.SET_TEACHERS:
            return {
                ...state,
                teachers: action.payload,
            };

        default:
            return state;
    }
};

export const useGlobalReducer = (obj = {}) =>
    useReducer(globalReducer, { ...initialState, obj });

export default globalReducer;
