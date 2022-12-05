import * as Yup from "yup";

export const validationSchema = Yup.object({
    firstName: Yup.string()
        .max(15, "El nombre debe tener menos de 15 caracteres")
        .required("Nombre requerido. *"),
    lastName: Yup.string()
        .max(20, "El apellido debe tener menos de 20 caracteres")
        .required("Apellido requerido *"),
    email: Yup.string()
        .email("Direccion de mail invalida")
        .required("Direccion de mail requerida. *"),
    password: Yup.string()
        .min(6, "La contraseña debe contener al menos 6 caracteres")
        .required("Contraseña requerida. *"),
    dni: Yup.number()
        .typeError("Debe ser un numero de documento valido")
        .min(9, "Numero de documento invalido")
        .required("Numero de documento requerido. *"),
    password2: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Las contraseñas deben coincidir. *"
    ),
    phone: Yup.number()
        .typeError("Debe ser un numero de telefono valido. *")
        .positive("Debe ser un numero positivo. *")
        .integer("Debe ser un numero entero. *")
        .min(8)
        .required("Nunero de telefono requerido. *"),
    birthday: Yup.string()
        .typeError("Debe ser una fecha de telefono valida")

        .required("Fecha de nacimiento requerida. *"),
    acceptedTerms: Yup.boolean()
        .required("acepar terminos y condiciones. *")
        .oneOf([true], "You must accept the terms and conditions."),
});
