import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../Redux/Slices/Session/sessionActions";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const navegar = useNavigate();
    const dispatch = useDispatch();

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center font-source-sans bg-event">
            <Formik
                initialValues={{ email: "" }}
                validate={(values) => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = "Requerido";
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                            values.email
                        )
                    ) {
                        errors.email = "Dirección email inválida";
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    dispatch(forgotPassword(values));
                    setSubmitting(false);
                    navegar("/");
                }}
            >
                {({ isSubmitting, errors }) => (
                    <Form className="w-full max-w-2xl bg-customGray p-8 flex flex-col justify-center items-center gap-4 rounded-xl">
                        <h4 className="text-3xl font-bold text-white uppercase">
                            Recupera tu contraseña
                        </h4>
                        <div className="flex flex-wrap w-full justify-evenly items-center">
                            <div className="w-full md:w-1/2 px-3">
                                <label
                                    htmlFor="email"
                                    className="block tracking-wide text-white text-s font-bold mb-2"
                                >
                                    Email
                                </label>
                                <Field
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="ejemplo@gmail.com"
                                    className={
                                        errors.email
                                            ? "appearance-none block w-full bg-red-100 text-gray-700 border border-customRed rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                            : "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    }
                                />
                                <ErrorMessage name="email">
                                    {(msg) => (
                                        <div className="text-customRed italic pl-1 text-xs font-semibold">
                                            {msg}
                                        </div>
                                    )}
                                </ErrorMessage>
                            </div>
                            <button
                                className="bg-customRed hover:bg-customGray text-white font-bold py-2 px-8 rounded border-2 border-transparent focus:outline-none focus:shadow-outline hover:text-customRed hover:border-customRed h-fit w-fit transition duration-300 ease-in-out"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                Submit
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ForgotPassword;
