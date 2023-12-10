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
    updateDoc,
    doc,
    QuerySnapshot,
} from "firebase/firestore";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    updateCurrentUser,
    updateProfile,
} from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
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
const storage = getStorage();
const currentUser = auth.currentUser;
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

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
const logInWithEmailAndPassword = async (email, password, navigate) => {
    try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        navigate('/');
        return response;
    } catch (error) {
        console.log(error);
    }
};

const updateUser = async (name, phoneNo, photoURL, bio) => {
    let userRef = null;
    const q = query(collection(db, "users"), where("uid", "==", auth.currentUser.uid));
    const docId = await getDocs(q).then(querySnapshot => {
        userRef = querySnapshot.docs[0].ref;
        const docId = querySnapshot.docs[0].id;
        return docId;
    });
    userRef = doc(db, "users", docId);
    await updateDoc(userRef, {
        name: name, phoneNumber: phoneNo, photoURL: photoURL, bio: bio
    }).then(userRef => {
        alert("profile updated");
    }).catch(error => {
        alert("Error!!")
    })
}
const registerWithEmailAndPassword = async (
    name,
    email,
    password,
    phoneNo = 0,
) => {
    try {
        const res = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name: name,
            authProvider: "local",
            email: email,
            phoneNumber: phoneNo,
        }).then(res => {
            alert("User registered!")
        })
    } catch (err) {
        console.log(err);
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
    } else {
        console.log("No user is logged in")
    }

}

const uploadImage = async (file, currentUser, setLoading, setPhotoURL) => {
    const fileRef = ref(storage, currentUser.uid + '.png');
    setLoading(true);
    const snapshot = await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);
    updateProfile(currentUser, { photoURL });
    setPhotoURL(photoURL);
    setLoading(false);
}

const uploadThumbnail = async (file, roadmapID, setUploadPicture, setLoading, setThumbnailURL) => {
    // const fileRef = ref(storage, roadmapID + '.png');
    setLoading(true);
    // const snapshot = await uploadBytes(fileRef, file);
    // const thumbnailURL = await getDownloadURL(fileRef);

    const storageRef = ref(storage, `/roadmapThumbnails/${roadmapID}`)
    const uploadTask = uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
    // getDownloadURL(storageRef).then((url) => {
    //     console.log(url);
    //     setThumbnailURL(url);
    // });

    // uploadTask.on(
    //     "state_changed",
    //     (snapshot) => {
    //         const percent = Math.round(
    //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //         );

    //         // update progress
    //         // setPercent(percent);
    //     },
    //     (err) => console.log(err),
    //     () => {
    //         // download url
    //         getDownloadURL(uploadTask.snapshot.ref).then((url) => {
    //             console.log(url);
    //             setThumbnailURL(url);
    //         });
    //     }
    // );
    setLoading(false);
    setUploadPicture(null);
}


export {
    auth,
    db,
    currentUser,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
    getToken,
    updateUser,
    uploadImage,
    uploadThumbnail
};