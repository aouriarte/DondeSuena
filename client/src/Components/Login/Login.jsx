import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { setLoginModal } from "../../Redux/Slices/Modals/modalActions";
import { login } from "../../Redux/Slices/Session/sessionActions";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import Loading from "react-loading";
import "./login.css";
import * as Yup from "yup";
import ReactModal from "react-modal";
import { logUser } from "../../Redux/Slices/Session/sessionSlice";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { loginOpen } = useSelector((state) => state.modalState);
    const [loading, setLoading] = useState(false);
    const [loginType, setLoginType] = useState(false);

    const handleSetModal = () => {
        dispatch(setLoginModal());
    };

    function handleCredentialResponse(response) {
        const body = { id_token: response.credential };
        let url = window.location.hostname.includes("localhost")
            ? "http://localhost:3001/auth/google"
            : "https://donde-suena.vercel.app/auth/google";
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                localStorage.setItem("email", data.user.email);
                dispatch(logUser(data.user));
                window.location.reload();
            })
            .catch((err) => console.log(err));
    }

    const handleSignIN = () => {
        const google = window.google;
        const client_id =
            "683964699898-crca6epeuihk7scmvh5in9fm6k9dlk17.apps.googleusercontent.com";
        const callback = handleCredentialResponse;
        const auto_select = true;
        google?.accounts?.id.initialize({
            client_id,
            callback,
            auto_select,
        });

        google?.accounts?.id.prompt((notification) => {
            if (notification.isNotDisplayed()) {
                console.log("Error: Google Sign-In not displayed");
            } else if (notification.isSkippedMoment()) {
                console.log("El usuario ha decidido no iniciar sesión");
            }
            setTimeout(handleSetModal, 3000);
        });
    };

    return (
        <ReactModal
            isOpen={loginOpen}
            ariaHideApp={false}
            onRequestClose={handleSetModal}
            className="modal w-full mx-auto max-w-2xl"
            style={{
                overlay: {
                    zIndex: 1000,
                    backgroundColor: "rgba(0, 0, 0, 0.75)",
                    objectFit: "contain",
                },
            }}
        >
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setLoading(true);
                    dispatch(login(values));
                    setSubmitting(false);
                    resetForm();
                    setTimeout(() => {
                        setLoading(false);
                        handleSetModal();
                    }, 2000);
                }}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .email("Direccion de mail invalida")
                        .required("Direccion de mail requerida. *"),
                    password: Yup.string()
                        .min(
                            6,
                            "La contraseña debe contener al menos 6 caracteres"
                        )
                        .required("Contraseña requerida. *"),
                })}
            >
                {({ isSubmitting, errors }) => (
                    <Form className="relative w-full mx-auto max-w-2xl bg-customGray p-4 flex flex-col justify-center items-center gap-2 my-8 rounded">
                        {location.pathname !== "/" && (
                            <h1 className="block tracking-wide text-white text-s font-bold mb-2 pt-5">
                                Debes iniciar sesion para continuar..
                            </h1>
                        )}
                        <div className="absolute right-8 top-5">
                            <button
                                type="button"
                                className="  bg-customRed hover:bg-customGray text-white font-bold py-2 px-4 rounded border-2 border-transparent focus:outline-none focus:shadow-outline hover:text-customRed hover:border-customRed"
                                onClick={handleSetModal}
                            >
                                x
                            </button>
                        </div>
                        <label
                            htmlFor="user"
                            className="block tracking-wide text-white text-s font-bold mb-2 mt-10"
                        >
                            Email
                        </label>
                        <div className="w-full px-3">
                            <Field
                                type="text"
                                name="email"
                                placeholder="usuario *"
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
                        <label
                            htmlFor="password"
                            className="block tracking-wide text-white text-s font-bold mb-2 pt-5"
                        >
                            Contraseña
                        </label>
                        <div className="w-full px-3">
                            <Field
                                type="password"
                                name="password"
                                placeholder="contraseña *"
                                className={
                                    errors.password
                                        ? "appearance-none block w-full bg-red-100 text-gray-700 border border-customRed rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                        : "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                }
                            />
                            <ErrorMessage name="password">
                                {(msg) => (
                                    <div className="text-customRed italic pl-1 text-xs font-semibold">
                                        {msg}
                                    </div>
                                )}
                            </ErrorMessage>
                        </div>
                        <div className="w-full md:w-3/3 px-3  font-bold text-m text-gray-400 hover:text-gray-500 cursor-pointer ">
                            <span
                                onClick={handleSetModal}
                                className="inline-block align-baseline font-bold text-xs text-gray-400 hover:text-customRed"
                            >
                                <Link to="/forgotPassword">
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </span>
                        </div>
                        <button
                            type="submit"
                            className="bg-customRed hover:bg-customGray text-white font-bold mt-3 mb-7 py-2 px-4 rounded border-2 border-transparent focus:outline-none focus:shadow-outline hover:text-customRed hover:border-customRed"
                            disabled={isSubmitting}
                        >
                            Iniciar Sesión
                        </button>
                        <div className="h-[10px]">{loading && <Loading />}</div>
                        <div className="flex flex-wrap justify-between w-full px-3">
                            <div onClick={() => setLoginType(!loginType)}>
                                <span className="gap-2 font-bold text-m text-gray-400 hover:text-gray-500 cursor-pointer">
                                    ¿Aún no estás registrado?
                                </span>
                            </div>
                            <div
                                onClick={handleSignIN}
                                className="flex flex-wrap gap-2 font-bold text-m text-gray-400 hover:text-gray-500 cursor-pointer"
                            >
                                <span>Iniciar sesión con Google</span>

                                <FcGoogle size={"1.5em"} />
                            </div>
                        </div>
                        {loginType && (
                            <div className="w-full mx-auto max-w-2xl max-h-[120px] bg-customGray p-4 flex flex-col justify-center items-center gap-2 rounded">
                                <h3 className="  block tracking-wide text-white text-s font-bold mb-2">
                                    SOY
                                </h3>
                                <div className=" flex wrap gap-20 divide-blue-200">
                                    <div
                                        onClick={() => {
                                            navigate("/register/artist");
                                            handleSetModal();
                                        }}
                                        className="cursor-pointer "
                                    >
                                        <div className="rounded-full">
                                            <img
                                                className="h-[70px] mb-1"
                                                src="https://res.cloudinary.com/ds41xxspf/image/upload/v1669650346/Donde-Suena-Assets/GUITARRA-EL%C3%89CTRICA_yaung2.png"
                                                alt="Guitarra"
                                            />
                                        </div>
                                        <h3 className="block tracking-wide text-white text-s font-bold mb-2">
                                            Artista
                                        </h3>
                                    </div>
                                    <div
                                        onClick={() => {
                                            navigate("/register/user");
                                            handleSetModal();
                                        }}
                                        className="cursor-pointer"
                                    >
                                        <img
                                            className="h-[60px] mb-3"
                                            src="https://res.cloudinary.com/ds41xxspf/image/upload/v1669650346/Donde-Suena-Assets/MANO-ROCK-CUERNOS_id2gif.png"
                                            alt="Manito"
                                        />
                                        <h3 className="block tracking-wide text-white text-s font-bold mb-2">
                                            Público
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Form>
                )}
            </Formik>
        </ReactModal>
    );
};

export default Login;
