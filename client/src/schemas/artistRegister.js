import * as yup from "yup";

// Regex for password minimum eight characters, at least one Uppercase letter, one lowercase letter and one number:
const passwordRx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const noSpaceAllowedRx = /^\S*$/;
const instagramRx =
    /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/(\w+)/gim;
const twitterRx =
    /^(?:https?:\/\/)?(?:www\.)?twitter\.com\/(#!\/)?[a-zA-Z0-9_]+$/i;
const spotifyRx =
    /(https?:\/\/open.spotify.com\/(track|user|artist|album)\/[a-zA-Z0-9]+(\/playlist\/[a-zA-Z0-9]+|)|spotify:(track|user|artist|album):[a-zA-Z0-9]+(:playlist:[a-zA-Z0-9]+|))/;
const phoneRx =
    /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

export const basicSchema = yup.object().shape({
    firstName: yup
        .string()
        .max(20, "(No puede contener más de 20 caracteres)")
        .min(3, "(Al menos debe contener 3 caracteres)")
        .matches(noSpaceAllowedRx, "Nombre no válido")
        .required("*"),
    lastName: yup
        .string()
        .max(20, "(No puede contener más de 20 caracteres)")
        .min(3, "(Al menos debe contener 3 caracteres)")
        .matches(noSpaceAllowedRx, "(Apellido no válido)")
        .required("*"),
    nickname: yup
        .string()
        .max(20, "(No puede contener más de 20 caracteres)")
        .min(2, "(Al menos debe contener 2 caracteres)")
        .required("*"),
    email: yup.string().email("(Email no válido)").required("*"),
    password: yup
        .string()
        .min(8, "(Debe contener al menos 8 caracteres)")
        .matches(
            passwordRx,
            "(Debe contener al menos una letra mayúscula, una minúscula y un número)"
        )
        .required("*"),
    password2: yup
        .string()
        .oneOf([yup.ref("password"), null], "(No coinciden)")
        .required("*"),
    description: yup
        .string()
        .max(200, "(No puede contener más de 200 caracteres)")
        .required("*"),
    instagram: yup
        .string()
        .url("(Url no válido)")
        .matches(instagramRx, "(Url de instagram no válido)"),
    twitter: yup
        .string()
        .url("(Url no válido)")
        .matches(twitterRx, "(Url de twitter no válido)"),
    spotify: yup
        .string()
        .url("(Url no válido)")
        .matches(spotifyRx, "(Url de spotify no válido)"),
    phone: yup.string().matches(phoneRx, "(Número no válido)").required("*"),
    agreeTerms: yup
        .bool()
        .oneOf([true], "(Debes aceptar los Términos y Condiciones)")
        .required("*"),
});
