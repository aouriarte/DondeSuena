import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import store from "./Redux/index";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";

const persistor = persistStore(store);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <PersistGate persistor={persistor}>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<App />}></Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </PersistGate>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
