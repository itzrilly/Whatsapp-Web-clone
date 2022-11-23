import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCQR2LrJll83HMrysgyTQDufaV-vIjbpNM",
    authDomain: "whatsapp-clone-a6b80.firebaseapp.com",
    projectId: "whatsapp-clone-a6b80",
    storageBucket: "whatsapp-clone-a6b80.appspot.com",
    messagingSenderId: "206937029999",
    appId: "1:206937029999:web:4faf40ba39217cc45ffc9a",
    measurementId: "G-26WV8RCSEM"
};

const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const db = app.firestore();

const googleProvider = new firebase.auth.GoogleAuthProvider();

export { auth, googleProvider };

export default db;