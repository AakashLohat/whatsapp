import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyBErPxeMgedBBqzVPI4xEKeMHOathVR4mk",
    authDomain: "whatsapp-8535d.firebaseapp.com",
    projectId: "whatsapp-8535d",
    storageBucket: "whatsapp-8535d.appspot.com",
    messagingSenderId: "191174540851",
    appId: "1:191174540851:web:5dd9b76942d53f5c566d46"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const db = app.firestore();
const auth = app.auth();

const provider = new firebase.auth.GoogleAuthProvider();
export { db, auth, provider };