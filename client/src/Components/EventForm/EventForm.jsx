import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { eventSchema } from "../../schemas/eventCreation";
import { submitEventForm } from "../../Redux/Slices/Event/eventActions";
import { getGenres } from "../../Redux/Slices/Genres/genresAction";
import { getPlaces } from "../../Redux/Slices/Places/placesAction";
import axios from "axios";
import Swal from "sweetalert2";

const EventCreation = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState("");
    const [success, setSuccess] = useState(false);
    const [defaultGenre, setDefaultGenre] = useState("");
    const [genresSelect, setGenresSelect] = useState([]);
    const [genreEmpty, setGenreEmpty] = useState(true);
    const [placeChosen, setPlaceChosen] = useState("");
    const { places } = useSelector((state) => state.placesState);
    const { genres } = useSelector((state) => state.genresState);
    const { user } = useSelector((state) => state.sessionState);

    if (!user.isLogged) {
        Swal.fire({
            title: "Ocurrió un error",
            text: "Debes Iniciar Sesión como Artista para crear un Evento",
            icon: "error",
            timer: 5000,
        });
    }

    useEffect(() => {
        dispatch(getPlaces());
        dispatch(getGenres());
    }, []);

    useEffect(() => {
        genresSelect.length > 0 ? setGenreEmpty(false) : setGenreEmpty(true);
    }, [genresSelect]);

    const onSubmit = async (values, actions) => {
        const location = placeChosen.split("*");
        const formValues = {
            ...values,
            image: image,
            genres: genresSelect,
            artistName: user.nickname,
            city: location[0],
            address: location[1],
        };
        try {
            const eventId = await dispatch(submitEventForm(formValues));
            console.log(formValues);
            setSuccess(false);
            actions.resetForm();
            setGenresSelect([]);
            setPlaceChosen({});
            navigate(`/details/${eventId}`);
        } catch (error) {
            console.log(error);
        }
    };

    const uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "Donde-Suena-Events");
        setLoading(true);
        const res = await axios.post(
            "https://api.cloudinary.com/v1_1/ds41xxspf/image/upload",
            data
        );
        res.data.secure_url ? setSuccess(true) : setSuccess(false);
        setImage(res.data.secure_url);
        setLoading(false);
    };

    function handlePlaces(event) {
        setPlaceChosen(event.target.value);
    }

    function handleGenres(event) {
        if (genresSelect.includes(event.target.value)) {
            Swal.fire({
                title: "Ooops...",
                text: "Ese género ya está enlistado",
                icon: "warning",
                timer: 2000,
            });
        } else {
            if (genresSelect.length > 2)
                Swal.fire({
                    title: "Ooops...",
                    text: "La máxima cantidad de géneros posibles es 3",
                    icon: "warning",
                    timer: 2000,
                });
            else {
                setGenresSelect([...genresSelect, event.target.value]);
            }
        }
    }

    function handleClearGenre(element) {
        setGenresSelect(genresSelect.filter((genre) => genre !== element));
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues: {
                name: "",
                date: "",
                start: "",
                end: "",
                price: 0,
                quotas: 0,
                description: "",
                phone: "",
                agreeTerms: false,
            },
            validationSchema: eventSchema,
            onSubmit,
        });

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-event font-source-sans">
            <form
                onSubmit={handleSubmit}
                autoComplete="off"
                className="w-full max-w-2xl bg-customGray p-4 flex flex-col justify-center items-center gap-4 my-8 rounded"
            >
                <div className="flex flex-wrap -mx-3 w-full">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                            htmlFor="name"
                            className="block tracking-wide text-white text-s font-bold mb-2"
                        >
                            Nombre
                            {errors.name && touched.name ? (
                                <span className="text-customRed italic pl-1 text-xs font-semibold">
                                    {errors.name}
                                </span>
                            ) : null}
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Concierto"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                                errors.name && touched.name
                                    ? "appearance-none block w-full bg-red-100 text-gray-700 border border-customRed rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    : "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            }
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label
                            htmlFor="date"
                            className="block tracking-wide text-white text-s font-bold mb-2"
                        >
                            Fecha
                            {errors.date && touched.date ? (
                                <span className="text-customRed italic pl-1 text-xs font-semibold">
                                    {errors.date}
                                </span>
                            ) : null}
                        </label>
                        <input
                            id="date"
                            type="date"
                            value={values.date}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                                errors.date && touched.date
                                    ? "appearance-none block w-full bg-red-100 text-gray-700 border border-customRed rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    : "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            }
                        />
                    </div>
                </div>
                <div className="flex flex-wrap w-full">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                            htmlFor="start"
                            className="block tracking-wide text-white text-s font-bold mb-2"
                        >
                            Hora de Inicio
                            {errors.start && touched.start ? (
                                <span className="text-customRed italic pl-1 text-xs font-semibold">
                                    {errors.start}
                                </span>
                            ) : null}
                        </label>
                        <input
                            id="start"
                            type="time"
                            value={values.start}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                                errors.start && touched.start
                                    ? "appearance-none block w-full bg-red-100 text-gray-700 border border-customRed rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    : "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            }
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label
                            htmlFor="end"
                            className="block tracking-wide text-white text-s font-bold mb-2"
                        >
                            Hora de Finalización
                            {errors.end && touched.end ? (
                                <span className="text-customRed italic pl-1 text-xs font-semibold">
                                    {errors.end}
                                </span>
                            ) : null}
                        </label>
                        <input
                            id="end"
                            type="time"
                            value={values.end}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                                errors.end && touched.end
                                    ? "appearance-none block w-full bg-red-100 text-gray-700 border border-customRed rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    : "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            }
                        />
                    </div>
                </div>
                <div className="w-full px-3">
                    <label
                        htmlFor="address"
                        className="block tracking-wide text-white text-s font-bold mb-2"
                    >
                        Locación
                        {/* {errors.address ? (
                            <span className="text-customRed italic pl-1 text-xs font-semibold">
                                {errors.address}
                            </span>
                        ) : null} */}
                    </label>
                    <select
                        name="address"
                        value={placeChosen}
                        onChange={handlePlaces}
                        className="rounded py-2 pl-3 w-full focus:outline-none bg-gray-200 focus:bg-white"
                    >
                        <option value="" disabled>
                            Lugares Disponibles
                        </option>
                        {places.length > 0 &&
                            places.map((place, key) => {
                                return (
                                    <option key={key} value={`${place.city}*${place.address}`}>
                                        {`${place.name}`}
                                    </option>
                                );
                            })}
                    </select>
                </div>
                <div className="flex flex-wrap -mx-3 w-full">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                            htmlFor="genres"
                            className="block tracking-wide text-white text-s font-bold mb-2"
                        >
                            Géneros
                        </label>
                        <select
                            name="genres"
                            value={
                                genresSelect.length
                                    ? genresSelect[genresSelect.length - 1]
                                    : defaultGenre
                            }
                            onChange={handleGenres}
                            className="rounded py-2 pl-3 w-full focus:outline-none bg-gray-200 focus:bg-white"
                        >
                            <option value="" disabled>
                                Géneros Disponibles
                            </option>
                            {genres.length > 0 &&
                                genres.map((genre, key) => {
                                    return (
                                        <option key={key} value={genre.name}>
                                            {genre.name}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                    <div className="w-full md:w-1/2 px-3 flex flex-col items-center justify-center">
                        <div className="flex flex-wrap justify-center items-center gap-2">
                            {genresSelect.map((genre, key) => {
                                return (
                                    <div
                                        key={key}
                                        className="border-2 rounded-full flex justify-center items-center p-1 gap-2"
                                    >
                                        <p className="text-white font-bold italic pl-1">
                                            {genre}
                                        </p>
                                        <button
                                            onClick={() =>
                                                handleClearGenre(genre)
                                            }
                                            className="bg-white hover:bg-customRed hover:text-white  text-customGray font-bold rounded-full px-2 transition duration-300"
                                            type="button"
                                        >
                                            X
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 w-full">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                            htmlFor="quotas"
                            className="block tracking-wide text-white text-s font-bold mb-2"
                        >
                            Entradas Disponibles
                            {errors.quotas && touched.quotas ? (
                                <span className="text-customRed italic pl-1 text-xs font-semibold">
                                    {errors.quotas}
                                </span>
                            ) : null}
                        </label>
                        <input
                            id="quotas"
                            type="number"
                            placeholder="--"
                            min={"0"}
                            value={values.quotas}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                                errors.quotas && touched.quotas
                                    ? "appearance-none block w-full bg-red-100 text-gray-700 border border-customRed rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    : "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            }
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label
                            htmlFor="price"
                            className="block tracking-wide text-white text-s font-bold mb-2"
                        >
                            Precio
                            {errors.price && touched.price ? (
                                <span className="text-customRed italic pl-1 text-xs font-semibold">
                                    {errors.price}
                                </span>
                            ) : null}
                        </label>
                        <input
                            id="price"
                            type="number"
                            placeholder="--$"
                            min={"0"}
                            value={values.price}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                                errors.price && touched.price
                                    ? "appearance-none block w-full bg-red-100 text-gray-700 border border-customRed rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    : "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            }
                        />
                    </div>
                </div>
                <div className="w-full px-3">
                    <label
                        htmlFor="description"
                        className="block tracking-wide text-white text-s font-bold mb-2"
                    >
                        Descripción
                        {errors.description && touched.description ? (
                            <span className="text-customRed italic pl-1 text-xs font-semibold">
                                {errors.description}
                            </span>
                        ) : null}
                    </label>
                    <textarea
                        id="description"
                        type="textarea"
                        rows="2"
                        placeholder={`Más sobre ${values.name}...`}
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                            errors.description && touched.description
                                ? "appearance-none block w-full bg-red-100 text-gray-700 border border-customRed rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                : "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 scroll-y"
                        }
                    />
                </div>
                <div className="flex flex-wrap w-full">
                    <div className="w-full md:w-1/2 mb-6 md:mb-0 px-3">
                        <label
                            htmlFor="phone"
                            className="flex items-center tracking-wide text-white text-s font-bold mb-2"
                        >
                            Teléfono del Organizador
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
                            Póster Publicitario
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
                            accept="image/png, image/jpeg, image/jpg"
                            onChange={uploadImage}
                            onBlur={handleBlur}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-customRed file:text-white hover:file:bg-gray-400"
                        />
                    </div>
                </div>
                { image ?
                    <div className="flex flex-col gap-4 w-full h-96 px-3">
                        <p
                            className="uppercase text-white font-bold"
                        >Preview Póster Publicitario</p>
                        <img src={image} className="w-full h-full border-2 object-cover"/>
                    </div> : null
                }
                <div className="flex flex-col items-center">
                    <div className="flex flex-row-reverse items-center justify-center gap-2">
                        <label
                            htmlFor="agreeTerms"
                            className="block tracking-wide text-white text-s font-bold"
                        >
                            Acepto los{" "}
                            <a
                                href="#"
                                className="inline-block align-baseline font-bold text-m text-gray-400 hover:text-customRed"
                            >
                                Terminos y Condiciones
                            </a>
                        </label>
                        <input
                            id="agreeTerms"
                            type="checkbox"
                            checked={values.agreeTerms}
                            value={values.agreeTerms}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="leading-tight"
                        />
                    </div>
                    {errors.agreeTerms && touched.agreeTerms ? (
                        <span className="text-customRed italic pl-1 text-xs font-semibold">
                            {errors.agreeTerms}
                        </span>
                    ) : null}
                </div>
                <div>
                    <button
                        type="submit"
                        disabled={!success || genreEmpty}
                        className="bg-customRed hover:bg-customGray text-white font-bold py-2 px-4 rounded border-2 border-transparent focus:outline-none focus:shadow-outline hover:text-customRed hover:border-customRed mt-4 disabled:opacity-5"
                    >
                        Crear Evento
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EventCreation;
