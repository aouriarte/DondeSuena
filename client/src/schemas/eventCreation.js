import * as yup from "yup";
import moment from "moment";

const phoneRx = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

function addDays(days) {
    let result = new Date();
    result.setDate(result.getDate() + days);
    return result;
}

export const eventSchema = yup.object().shape({
    name: yup
        .string()
        .max(50, "(No puede contener más de 50 caracteres)")
        .min(8, "(Al menos debe contener 8 caracteres)")
        .required("*"),
    date: yup
        .date()
        .min(
            addDays(5).toDateString(),
            `La fecha no puede ser antes del ${addDays(5).toDateString()}`
        )
        .required("*"),
    start: yup.string().required("*"),
    end: yup
        .string()
        .test(
            "is-greater",
            "(La hora de finalización debe ser mayor)",
            function (value) {
                const { start } = this.parent;
                return moment(value, "HH:mm").isAfter(moment(start, "HH:mm"));
            }
        )
        .required("*"),
    quotas: yup
        .number()
        .min(1, "(Mín: 1 entrada)")
        .max(100000, "(Máx: 100000 entradas)")
        .required("*"),
    price: yup
        .number()
        .min(1, "(El valor mínimo es 1$)")
        .max(200000, "El valor máximo es 200000$")
        .required("*"),
    description: yup
        .string()
        .min(50, "(Debe contener al menos 50 caracteres)")
        .max(600, "(No puede contener más de 600 caracteres)")
        .required("*"),
    phone: yup.string().matches(phoneRx, "(Número no válido)").required("*"),
    agreeTerms: yup
        .bool()
        .oneOf([true], "(Debes aceptar los Términos y Condiciones)")
        .required("*"),
});
