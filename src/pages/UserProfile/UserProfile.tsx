import React, { ChangeEvent, useState, useEffect } from "react";
import { Box, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button/Button";
import Toolbar from "@mui/material/Toolbar";
import DropInput from "./DropInput";
import { Footer } from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout, updateUser, uploadImage } from "../../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

function UserProfile() {
  const currentUser = auth.currentUser;

  const userPic = require("../../assets/icons/user.png");
  const [user, load, error] = useAuthState(auth);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState(
    "https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg"
  );
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [editable, setEditable] = useState(false);

  const fetchUserData = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      console.log(data);

      setDisplayName(data.name);
      setEmail(data.email);
      setPhoneNumber(data.phoneNumber);
      if (data.bio) setBio(data.bio);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  const editProfile = async () => {
    await updateUser(displayName, phoneNumber, photoURL, bio);
  };

  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  }

  function handleClick() {
    uploadImage(photo, currentUser, setLoading, setPhotoURL);
  }

  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
    // if (loading) {
    //     // maybe trigger a loading screen
    //     return;
    // }
    if (user) {
      fetchUserData();
      // setPhotoURL(user?.photoURL)
      console.log(user);
    }
  }, [currentUser, user]);

  return (
    <Box style={{ width: "100%", paddingLeft: "100px", paddingRight: "100px" }}>
      <Toolbar />
      <Box
        style={{
          minWidth: "600px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          style={{
            width: "100%",
            height: "20vh",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "aliceblue",
          }}
        >
          <Box
            style={{
              width: "80%",
              paddingLeft: "20px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: "-200px",
            }}
          >
            <img src={photoURL} alt="profile picture" width={150}></img>
            <Typography variant="h4" style={{ marginTop: "20px", marginLeft: "20px" }}>
              Hi, {displayName}
            </Typography>
          </Box>
          <Box
            style={{
              width: "20%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "-230px",
            }}
          >
            <Button variant="outlined" color="primary" onClick={editProfile}>
              Edit Profile
            </Button>
          </Box>
        </Box>
        <Box style={{ display: "flex", flexDirection: "column", marginTop: "100px" }}>
          <Typography variant="h6">Display Name</Typography>
          <TextField
            className=""
            id=""
            label=""
            placeholder=""
            value={displayName}
            variant="outlined"
            style={{ width: "400px", marginBottom: "30px" }}
            onChange={(e) => setDisplayName(e.target.value)}
            // onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
          />
          <Typography variant="h6">Phone Number</Typography>
          <TextField
            className=""
            id=""
            label=""
            placeholder=""
            value={phoneNumber}
            inputProps={{ readOnly: false }}
            variant="outlined"
            style={{ width: "400px", marginBottom: "30px" }}
            onChange={(e) => setPhoneNumber(e.target.value)}
            // onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
          />
          <Typography variant="h6">E-Mail</Typography>
          <TextField
            className=""
            id=""
            label=""
            placeholder=""
            value={email}
            disabled
            inputProps={{ readOnly: true }}
            variant="outlined"
            style={{ width: "400px", marginBottom: "30px" }}
          />
          {/* <DropInput /> */}
          <Typography variant="h6">Profile Picture</Typography>
          <input type="file" onChange={handleChange} />
          <button disabled={loading || !photo} onClick={handleClick}>
            Upload
          </button>
          <Typography variant="h6" style={{ marginTop: "30px" }}>
            Bio
          </Typography>
          <TextField
            className=""
            id=""
            label=""
            placeholder=""
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            variant="outlined"
            style={{ width: "400px", marginBottom: "30px" }}
            // onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
          />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
export default UserProfile;

// import React from 'react';
// import { Box, TextField } from '@mui/material';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import { CardActionArea } from '@mui/material';
// import Button from '@mui/material/Button/Button';
// import Toolbar from '@mui/material/Toolbar';
// import DropInput from './DropInput';
// import { Footer } from '../../components/Footer/Footer';
// const userPic = require("../../assets/icons/user.png");

// function UserProfile() {
//     return (
//         <Box style={{ width: '100%', paddingLeft: '100px', paddingRight: '100px' }}>
//             <Toolbar />
//             <Box style={{ minWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
//                 <Box style={{ width: '100%', height: '20vh', display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: 'aliceblue' }}>
//                     <Box style={{ width: '80%', paddingLeft: '20px', display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '-200px' }}>
//                         <img src={userPic} alt="profile picture" width={150}></img>
//                         <Typography variant='h4' style={{ marginTop: '20px', marginLeft: '20px' }}>John Doe</Typography>
//                     </Box>
//                     <Box style={{ width: '20%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: '-230px' }}>
//                         <Button variant="outlined" color="primary" >Edit Profile</Button>
//                     </Box>
//                 </Box>
//                 <Box style={{ display: 'flex', flexDirection: 'column', marginTop: '100px' }}>
//                     <Typography variant='h6'>First Name</Typography>
//                     <TextField
//                         className=''
//                         id=''
//                         label=''
//                         placeholder=''

//                         variant='outlined'
//                         style={{ width: '400px', marginBottom: '30px' }}
//                     // onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
//                     />
//                     <Typography variant='h6'>Last Name</Typography>
//                     <TextField
//                         className=''
//                         id=''
//                         label=''
//                         placeholder=''

//                         variant='outlined'
//                         style={{ width: '400px', marginBottom: '30px' }}
//                     // onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
//                     />
//                     <Typography variant='h6'>E-Mail</Typography>
//                     <TextField
//                         className=''
//                         id=''
//                         label=''
//                         placeholder=''

//                         variant='outlined'
//                         style={{ width: '400px', marginBottom: '30px' }}
//                     // onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
//                     />
//                     <DropInput />
//                     <Typography variant='h6' style={{ marginTop: '30px' }}>Bio</Typography>
//                     <TextField
//                         className=''
//                         id=''
//                         label=''
//                         placeholder=''

//                         variant='outlined'
//                         style={{ width: '400px', marginBottom: '30px' }}
//                     // onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
//                     />
//                 </Box>
//             </Box>
//             <Footer />
//         </Box>
//     )
// }
// export default UserProfile;
