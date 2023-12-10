import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grow,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material/";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import "./ForgotPasswordBlock.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../../firebase";
import Link from "@mui/material/Link";
import { sendPasswordReset } from "../../firebase";
import Typography from "@mui/material/Typography";

const ForgotPasswordBlock = () => {
  const history = useNavigate();
  const [email, setemail] = useState("");
  const [user, loading, error] = useAuthState(auth);

  const handleForgotPassword = () => {
    sendPasswordReset(email);
  };

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) history("/");
  }, [user, loading]);

  return (
    <>
      <Toolbar />
      <Grow in={true} timeout={500}>
        <Box
          style={{
            width: "100%",
            height: "83vh",
            paddingTop: "50px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Card variant="outlined" className="CreateBoardCard" style={{ maxWidth: "600px", maxHeight: "800px" }}>
            <CardHeader className="LoginHeader" title="Reset Password" titleTypographyProps={{ variant: "h4" }} />
            <CardContent
              className="LoginContent"
              style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            >
              <Typography>
                Enter the email id associated with your account and we will send an email to reset your password.
              </Typography>
              <TextField
                className="LoginTextField"
                required
                id="filled-required"
                label="Email ID"
                placeholder="Enter Email ID"
                variant="outlined"
                style={{ marginTop: "20px" }}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setemail(event.target.value)}
              />
            </CardContent>

            <CardActions className="LoginAction">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => handleForgotPassword()}
                className="LoginButton"
              >
                Send Link
              </Button>
            </CardActions>

            <CardContent className="LoginContent">
              <Link href="/Login">try Login?</Link>
            </CardContent>
          </Card>
        </Box>
      </Grow>
    </>
  );
};
export default ForgotPasswordBlock;
