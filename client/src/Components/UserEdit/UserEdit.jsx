import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { editUserForm } from "../../Redux/Slices/Session/sessionActions";
import { validationSchema } from "../../schemas/userRegister";
import { editUserSchema } from "../../schemas/userEdit";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";

const UserEditForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState("");
    const [success, setSuccess] = useState(false);
    const [image, setImage] = useState("");
    const { user } = useSelector((state) => state.sessionState);
    const [id] = useState(user.uid ? user.uid : user.id);

    function navegar() {
        navigate("/");
    }

    const onSubmit = (values, actions) => {
        const formValues = {
            ...values,
            image: image
        };
        try {
            dispatch(editUserForm(formValues, id));
            setSuccess(false);
            actions.resetForm();
            setTimeout(navigate("/"), 3000);
        } catch (error) {
            console.log(error);
        }
    };

    const uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "Donde-Suena-Artists");
        setLoading(true);
        const res = await axios.post(
            "https://api.cloudinary.com/v1_1/ds41xxspf/image/upload",
            data
        );
        res.data.secure_url ? setSuccess(true) : setSuccess(false);
        setImage(res.data.secure_url);
        setLoading(false);
    };


    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues: {
                email: user.email,
                dni: user.dni,
                phone: user.phone,
                birthday: user.birthday,
            },
            validationSchema: editUserSchema,
            onSubmit,
        });

    return (
        <div className="h-full w-full flex flex-col items-center justify-center bg-customGray font-source-sans rounded-3xl">
            <div className="flex border-2 bg-gray-400 w-52 h-52 items-center justify-center rounded-full overflow-hidden mt-8">
                <img src={user.image || "https://res.cloudinary.com/ds41xxspf/image/upload/v1669140075/Donde-Suena-Assets/user_snefch.png"} className="object-cover w-full h-full" alt="" />
            </div>
            <form
                onSubmit={handleSubmit}
                autoComplete="on"
                className="w-full max-w-2xl bg-customGray p-4 flex flex-col justify-center items-center gap-4 rounded-3xl"
            >
                <div className="w-full px-3">
                    <label
                        htmlFor="email"
                        className="block tracking-wide text-white text-s font-bold mb-2"
                    >
                        Email
                        {errors.email && touched.email ? (
                            <span className="text-customRed italic pl-1 text-xs font-semibold">
                                {errors.email}
                            </span>
                        ) : null}
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="luimecontacto@ejemplo.com"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                            errors.email && touched.email
                                ? "appearance-none block w-full bg-red-100 text-gray-700 border border-customRed rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                : "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        }
                    />
                </div>
                <div className="w-full px-3">
                    <label
                        htmlFor="dni"
                        className="block tracking-wide text-white text-s font-bold mb-2"
                    >
                        Documento
                        {errors.dni && touched.dni ? (
                            <span className="text-customRed italic pl-1 text-xs font-semibold">
                                {errors.dni}
                            </span>
                        ) : null}
                    </label>
                    <input
                        id="dni"
                        type="dni"
                        
                        placeholder={`Escribe tu DNI`}
                        value={values.dni}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                            errors.dni && touched.dni
                                ? "appearance-none block w-full bg-red-100 text-gray-700 border border-customRed rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                : "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 scroll-y"
                        }
                    />
                </div>
                <div className="w-full px-3">
                    <label
                        htmlFor="dni"
                        className="block tracking-wide text-white text-s font-bold mb-2"
                    >
                        Fecha de nacimiento
                        {errors.birthday && touched.birthday ? (
                            <span className="text-customRed italic pl-1 text-xs font-semibold">
                                {errors.birthday}
                            </span>
                        ) : null}
                    </label>
                    <input
                        id="birthday"
                        type="birthday"
                        
                        placeholder={`Fecha de nacimiento`}
                        value={values.birthday}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                            errors.birthday && touched.birthday
                                ? "appearance-none block w-full bg-red-100 text-gray-700 border border-customRed rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                : "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 scroll-y"
                        }
                    />
                </div>
                {/* <div className="w-full px-3 mb-3 flex flex-col gap-2">
                    <p className="block tracking-wide text-white text-lg font-bold text-center">
                        Sitios Web
                    </p>
                    <div>
                        <label
                            htmlFor="instagram"
                            className="block tracking-wide text-white text-s font-bold mb-2"
                        >
                            Instagram
                            {errors.instagram && touched.instagram ? (
                                <span className="text-customRed italic pl-1 text-xs font-semibold">
                                    {errors.instagram}
                                </span>
                            ) : null}
                        </label>
                        <input
                            id="instagram"
                            type="url"
                            placeholder="https://instagram.com/username"
                            value={values.instagram}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                                errors.instagram && touched.instagram
                                    ? "appearance-none block w-full bg-red-100 text-gray-700 border border-customRed rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    : "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            }
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="twitter"
                            className="block tracking-wide text-white text-s font-bold mb-2"
                        >
                            Twitter
                            {errors.twitter && touched.twitter ? (
                                <span className="text-customRed italic pl-1 text-xs font-semibold">
                                    {errors.twitter}
                                </span>
                            ) : null}
                        </label>
                        <input
                            id="twitter"
                            type="url"
                            placeholder="https://twitter.com/username"
                            value={values.twitter}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                                errors.twitter && touched.twitter
                                    ? "appearance-none block w-full bg-red-100 text-gray-700 border border-customRed rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    : "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            }
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="spotify"
                            className="block tracking-wide text-white text-s font-bold mb-2"
                        >
                            Spotify
                            {errors.spotify && touched.spotify ? (
                                <span className="text-customRed italic pl-1 text-xs font-semibold">
                                    {errors.spotify}
                                </span>
                            ) : null}
                        </label>
                        <input
                            id="spotify"
                            type="url"
                            placeholder="https://open.spotify.com/artist/yourprofile"
                            value={values.spotify}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                                errors.spotify && touched.spotify
                                    ? "appearance-none block w-full bg-red-100 text-gray-700 border border-customRed rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    : "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            }
                        />
                    </div>
                </div> */}
                <div className="flex flex-wrap w-full">
                    <div className="w-full md:w-1/2 mb-6 md:mb-0 px-3">
                        <label
                            htmlFor="phone"
                            className="flex items-center tracking-wide text-white text-s font-bold mb-2"
                        >
                            Número Telefónico
                            {errors.phone && touched.phone ? (
                                <span className="text-customRed italic pl-1 text-xs font-semibold">
                                    {errors.phone}
                                </span>
                            ) : null}
                        </label>
                        <input
                            id="phone"
                            type="text"
                            placeholder="1234567890"
                            value={values.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                                errors.phone && touched.phone
                                    ? "appearance-none block w-full bg-red-100 text-gray-700 border border-customRed rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    : "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            }
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label
                            htmlFor="image"
                            className="flex items-center tracking-wide text-white text-s font-bold mb-2"
                        >
                            Foto de Perfil
                            {loading ? (
                                <span className="text-customRed italic pl-1 text-xs font-semibold">
                                    (Subiendo Imágen...)
                                </span>
                            ) : success ? (
                                <span className="text-green-500 italic pl-1 text-xs font-semibold">
                                    (Imágen subida con éxito)
                                </span>
                            ) : null}
                        </label>
                        <input
                            id="image"
                            type="file"
                            placeholder="Sube tu imagen aquí"
                            accept="image/png, image/jpeg, image/jpg"
                            onChange={uploadImage}
                            onBlur={handleBlur}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-customRed file:text-white hover:file:bg-gray-400"
                        />
                    </div>
                </div>
                <div>
                    <button
                        type="submit"
                        className="bg-customRed hover:bg-customGray text-white font-bold py-2 px-4 rounded border-2 border-transparent focus:outline-none focus:shadow-outline hover:text-customRed hover:border-customRed mt-4 disabled:opacity-5"
                    >
                        Actualizar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserEditForm;
