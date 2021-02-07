import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyAbTt8CQfMycfGn8cKAbvuOm6yc2VSu50Y",
    authDomain: "whatsapp-clone-3c529.firebaseapp.com",
    projectId: "whatsapp-clone-3c529",
    storageBucket: "whatsapp-clone-3c529.appspot.com",
    messagingSenderId: "536027348823",
    appId: "1:536027348823:web:22a1e037de0b91c127c812",
    measurementId: "G-P4G6CLR5Q9"
  };
//configuring the firebaseApp
const firebaseApp=firebase.initializeApp(firebaseConfig)
const db=firebaseApp.firestore();
const auth=firebase.auth();
const provider=new firebase.auth.GoogleAuthProvider();

export {auth,provider};
export default db;
