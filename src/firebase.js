// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

//Handover by Saj and Tanuja
// const firebaseConfig = {
//     apiKey: "AIzaSyCafy0xOjTTNZizJGDAhHoNXqqMQpJhH54",
//     authDomain: "rescom-347118.firebaseapp.com",
//     databaseURL: "https://rescom-347118-default-rtdb.firebaseio.com",
//     projectId: "rescom-347118",
//     storageBucket: "rescom-347118.appspot.com",
//     messagingSenderId: "121545648255",
//     appId: "1:121545648255:web:2d865875716c1dbf72374a",
//     measurementId: "G-530ES9XCWE"
// };

//Created by northstar team
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyANDGmnztamWsPzVR8cEchGYfE0dMhyICw",
    authDomain: "northstar-aa415.firebaseapp.com",
    projectId: "northstar-aa415",
    storageBucket: "northstar-aa415.appspot.com",
    messagingSenderId: "1036002322953",
    appId: "1:1036002322953:web:d536fe53bf24ffc3e7e6d8",
    measurementId: "G-HPX46DT3G3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
console.log("Auth : ", auth)

const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err) {
        console.error(err);
        alert("Please enter the right credentials");
    }
};
const logInWithEmailAndPassword = async (email, password) => {
    try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        // window.location.replace("/");
        return response;
    } catch (error) {
        console.log(error);
    }
};
const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        // user.updateProfile({
        //     displayName: name
        // }).catch(err => alert("Failed updating user name", name));
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name: name,
            authProvider: "local",
            email: email,
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
const logout = () => {
    signOut(auth);
};

const getToken = async () => {
    const user = auth().currentUser
    if (user) {
        const token = await user.getIdToken()
        return token;
        // const res = await fetch("url", {
        // headers: {authorization: `Bearer ${token}`}
        // })
    } else {
        console.log("No user is logged in")
    }

}
export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
    getToken
};