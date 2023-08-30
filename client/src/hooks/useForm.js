"use client";
import { useState } from "react";

const useForm = (initialValues, callback = async () => {}) => {
    const [values, setValues] = useState({
        ...initialValues,
        submitting: false,
    });

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        event.persist();
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        await callback(values, setErrors, setSubmitting);
        setSubmitting(false);
    };

    return {
        handleChange,
        values,
        errors,
        setSubmitting,
        setErrors,
        handleSubmit,
    };
};

export default useForm;
