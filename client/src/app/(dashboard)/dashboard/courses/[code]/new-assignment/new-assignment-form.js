import SubmitButton from "@/components/SubmitButton";
import useForm from "@/hooks/useForm";
import React from "react";
import { v4 as uuid } from "uuid";

const NewAssignmentForm = ({ initialValues, onSubmit = () => {} }) => {
    const { values, error, handleChange, handleSubmit } = useForm(
        initialValues,
        onSubmit
    );

    return (
        <section className="bg-gray-900">
            <div className="py-3 px-2 max-w-2xl lg:py-6">
                <h2 className="mb-4  text-xl md:text-2xl font-bold text-white">
                    Create a new assignment
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                Assignment Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                className=" border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Ex. Cloud and Information Technology (Batch 2025)"
                                required
                                value={values.name}
                                onChange={handleChange}
                                autoComplete="off"
                            />
                        </div>
                        <div className="w-full">
                            <label
                                htmlFor="code"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                Assignment Identifier
                            </label>
                            <input
                                type="text"
                                name="code"
                                className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Ex. citl-2025"
                                required
                                value={values.code}
                                onChange={handleChange}
                                autoComplete="off"
                            />
                        </div>
                        
                        
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="description"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                Description
                            </label>
                            <textarea
                                rows="8"
                                className="block p-2.5 w-full text-sm rounded-lg border  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Your description here"
                                name="description"
                                value={values.description}
                                onChange={handleChange}
                                autoComplete="off"
                            ></textarea>
                        </div>

                        <div className="sm:col-span-2">
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                Due Date
                            </label>
                            <input
                                type="date"
                                name="due date"
                                className=" border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                                required
                                value={values.name}
                                onChange={handleChange}
                                autoComplete="off"
                            />
                        </div>

                    </div>

                    <SubmitButton className="mt-4" type="submit">
                        Add Course
                    </SubmitButton>
                </form>
            </div>
        </section>
    );
};

export default NewAssignmentForm;
