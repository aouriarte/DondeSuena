import axios from "axios";
import { logUser, logoutUser } from "./sessionSlice";
import Swal from "sweetalert2";

function reloadPage() {
    window.location.replace("/");
}

const successCreationAlert = () => {
    Swal.fire({
        title: "Un paso mas..",
        text: "Revise su casilla de correo para completar el registro!",
        icon: "success",
        timer: 3000,
    });
};
const rejectedAlert = () => {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Registro incorrecto!",
    });
    setTimeout(() => {
        reloadPage();
    }, 2500);
};
const errorCreationAlert = (error) => {
    Swal.fire({
        title: "Ocurrió un error",
        text: `${error}`,
        icon: "error",
        timer: 3000,
    });
};
const successConfirmAlert = () => {
    Swal.fire({
        title: "Todo en orden!",
        text: "Bienvenido a Donde Suena!",
        icon: "success",
        timer: 2000,
    });
    setTimeout(() => {
        reloadPage();
    }, 2500);
};
const logOutAlert = () => {
    Swal.fire({
        title: "Sesión Cerrada",
        text: "Esperamos verte pronto!",
        icon: "success",
        timer: 2000,
    });
};
const resetPasswordAlert = () => {
    Swal.fire({
        title: "Contraseña Actualizada",
        text: "Por favor vuelva a iniciar sesión",
        icon: "success",
        timer: 3000,
    });
};
const sendEmailAlert = () => {
    Swal.fire({
        title: "Un paso mas...",
        text: "Revise su casilla de correo para completar el proceso!",
        icon: "success",
        timer: 3000,
    });
};

const successEditAlert = () => {
    Swal.fire({
        title: "Todo en Orden",
        text: "Los cambios se veran reflejados cuando vuelvas a Iniciar Sesión!",
        icon: "success",
        timer: 3000,
    });
};

export const login = (values) => (dispatch) => {
    axios
        .post("/auth/loginUser", values)
        .then((res) => {
            dispatch(logUser(res.data));
        })
        .catch((e) => {
            e.response.data
                ? errorCreationAlert(e.response.data.msg)
                : console.log(e);
        });
};

export const confirmateToken = (token) => (dispatch) => {
    axios
        .get(`/auth/confirmation/${token}`)
        .then((res) => {
            dispatch(logUser(res.data.usuario));
            successConfirmAlert();
        })
        .catch((e) => {
            console.log(e);
            rejectedAlert();
        });
};

export const forgotPassword = (email) => (dispatch) => {
    axios
        .put("/auth/forget-password", email)
        .then((res) => {
            sendEmailAlert();
        })
        .catch((e) => {
            e.response.data
                ? errorCreationAlert(e.response.data.msg)
                : console.log(e);
        });
};

export const resetPassword = (values, token) => (dispatch) => {
    axios
        .put(`/auth/new-password/${token}`, values)
        .then((res) => {
            resetPasswordAlert();
        })
        .catch((e) => console.log(e));
};

export const submitUserForm = (values) => (dispatch) => {
    console.log(values);
    axios
        .post("/auth/registerUser", values)
        .then((res) => {
            successCreationAlert();
        })
        .catch((e) => {
            e.response.data
                ? errorCreationAlert(e.response.data.msg)
                : console.log(e);
        });
};

export const submitArtistForm = (values) => (dispatch) => {
    axios
        .post("/auth/registerArtist", values)
        .then((res) => {
            successCreationAlert();
        })
        .catch((e) => {
            e.response.data
                ? errorCreationAlert(e.response.data.msg)
                : console.log(e);
        });
};

export const logOut = () => (dispatch) => {
    dispatch(logoutUser());
    logOutAlert();
};

export const deleteArtist = (id) => (dispatch) => {
    axios
        .delete(`auth/deleteArtist/${id}`)
        .then((res) => {
            dispatch(logoutUser());
        })
        .catch((e) => {
            e.response.data
                ? errorCreationAlert(e.response.data.msg)
                : console.log(e);
        });
};

export const editArtistForm = (values, id) => (dispatch) => {
    axios
        .put(`/auth/updateArtist/${id}`, values)
        .then((res) => {
            successEditAlert();
        })
        .catch((e) => {
            e.response.data
                ? errorCreationAlert(e.response.data.msg)
                : console.log(e);
        });
};

export const editUserForm = (values, id) => (dispatch) => {
    axios
        .patch(`/auth/updateUser/${id}`, values)
        .then((res) => {
            successEditAlert();
        })
        .catch((e) => {
            e.response.data
                ? errorCreationAlert(e.response.data.msg)
                : console.log(e);
        });
};
export const deleteUser = (id) => (dispatch) => {
    axios
        .delete(`auth/user/deleteUser/${id}`)
        .then((res) => {
            dispatch(logoutUser());
        })
        .catch((e) => {
            e.response.data
                ? errorCreationAlert(e.response.data.msg)
                : console.log(e);
        });
};