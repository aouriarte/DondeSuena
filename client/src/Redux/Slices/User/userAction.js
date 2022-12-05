import axios from "axios";

import {
    getAllTicketsByUser,
    paymentOrder,
    clearPaymentOrder,
    getDataUserId,
    createAllTicket
} from "./userSlice";

export const ticketPurchase = (values) => (dispatch) => {
    axios
        .post("/payment/crear-orden", values)
        .then((res) => dispatch(paymentOrder(res.data)))
        .catch((e) => console.log(e));
};

export const createTicketMP =
    (payment_id, purchasedQuantity, values) => (dispatch) => {
        console.log(values);
        axios
            .post(
                `/auth/user/createTicketMP?payment_id=${payment_id}&purchasedQuantity=${purchasedQuantity}`,
                values
            )
            .then((res) => dispatch(createAllTicket(res.data.newTicket)))
            .catch((e) => console.log(e));
    };

export const getTicketsByUser = (id) => (dispatch) => {
    axios(`/auth/user/getTickets/${id}`)
        .then((res) =>
            dispatch(getAllTicketsByUser(res.data.allTickets?.tickets))
        )
        .catch((e) => console.log(e));
};
export const clearUrl = () => (dispatch) => {
    dispatch(clearPaymentOrder());
};

export const getUserById = (id) => (dispatch) => {
    axios(`/auth/getUser/${id}`)
        .then((res) => dispatch(getDataUserId(res.data.user)))
        .catch((e) => console.log(e));
};

export const sendInvoice = (values) => {
    return async function (){
        try {
            const response = await axios.post(`/auth/user/sendInvoice`, values);
            console.log(response.data.msg);
        } catch (error) {
            console.log(error);
        }
    }
}
