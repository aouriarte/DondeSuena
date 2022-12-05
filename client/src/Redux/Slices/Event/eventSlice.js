import { createSlice } from "@reduxjs/toolkit";

export const eventsSlice = createSlice({
    name: "events",
    initialState: {
        events: [],
        detail: {},
        ticketsAvailable: 0,
    },

    reducers: {
        getAllEvents: (state, action) => {
            state.events = action.payload;
        },
        getAllEventsById: (state, action) => {
            state.detail = action.payload;
        },
        filteredEvents: (state, action) => {
            state.events = action.payload;
        },
        getEventsByName: (state, action) => {
            state.events = action.payload;
        },
        quantityTickets: (state, action) => {
            state.ticketsAvailable = action.payload;
        },
    },
});
export const {
    getAllEvents,
    getAllEventsById,
    filteredEvents,
    getEventsByName,
    quantityTickets,
} = eventsSlice.actions; //en .actions guardo las funciones
export default eventsSlice.reducer;
