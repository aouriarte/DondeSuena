// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyArhhJU3DcqNd_NeixuSTpdgiMYt1TbOc8",
    authDomain: "donde-suena.firebaseapp.com",
    projectId: "donde-suena",
    storageBucket: "donde-suena.appspot.com",
    messagingSenderId: "116901454415",
    appId: "1:116901454415:web:fb0ab28bbeb82113e4003a",
    measurementId: "G-1VJDK9CVH7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
