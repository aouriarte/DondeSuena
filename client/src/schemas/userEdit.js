import * as yup from "yup";

export const editUserSchema = yup.object().shape({
    email: yup.string().email("(Email no válido)").required("*"),
});
