import { createSlice } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import { format, compareAsc } from "date-fns";
import { date } from "yup";

const dateFormat = format(new Date(), "yyyy-MM-dd");

export const filterSlice = createSlice({
    name: "filter",
    initialState: {
        events: [],
        filteredByDate: [],
        filterCombined: {},
        date: dateFormat,
    },
    //usando redux toolkits son los reducers son una mezcla de actions y reducers
    reducers: {
        getAllEventsFilter: (state, action) => {
            state.events = action.payload;
            return {
                ...state,
                filteredByDate: [...state.events.date].filter(
                    (events) => events.date
                ),
            };
        },

        combineFilters: (state, action) => {
            if (!action.payload) return { ...state, filterCombined: {} };
            let by = action.payload;
            return {
                ...state,
                filterCombined: { ...state.filterCombined, ...by },
            };
        },

        searchByDate: (state, action) => {
            state.events = action.payload;
        },
    },
});

export const { getAllEventsFilter, searchByDate, combineFilters } =
    filterSlice.actions; //en .actions guardo las funciones

export default filterSlice.reducer;
