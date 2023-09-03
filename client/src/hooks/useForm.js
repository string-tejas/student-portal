"use client";
import { useState } from "react";

/**
 * Custom hook to handle form state
 * @param {Object} initialValues Inital values for the form
 * @param {() => Promise<void>} callback Callback function to be called on form submission
 * @returns {Object} An object containing the following:
 * - handleChange: Function to handle change in form values
 * - values: Current form values
 * - errors: Current form errors
 * - setSubmitting: Function to set the submitting state
 * - setErrors: Function to set the errors
 * - handleSubmit: Function to handle form submission
 */
const useForm = (initialValues, callback = async () => {}) => {
    const [values, setValues] = useState({
        ...initialValues,
        submitting: false,
    });

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        setValues((values) => ({
            ...values,
            [event.target.name]: event.target.value,
        }));
    };

    const setSubmitting = (submitting) => {
        setValues((values) => ({
            ...values,
            submitting,
        }));
    };

    const resetValues = () => {
        setValues({ ...initialValues, submitting: false });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        await callback(values, setErrors, resetValues, setSubmitting);
        setSubmitting(false);
    };

    return {
        handleChange,
        values,
        errors,
        setSubmitting,
        setErrors,
        handleSubmit,
        resetValues,
    };
};

export default useForm;
