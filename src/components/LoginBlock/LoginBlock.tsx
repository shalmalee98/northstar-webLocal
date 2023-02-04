import { Button, Card, CardActions, CardContent, CardHeader, Grow, TextField, InputAdornment, IconButton } from '@material-ui/core';
import Box from '@mui/material/Box';
import { Email, Label } from '@material-ui/icons';
import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import './LoginBlock.css';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from '../../firebase';
import { Routes } from '../../service/config';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Link from '@mui/material/Link';
import { async } from '@firebase/util';
import Toolbar from '@mui/material/Toolbar';

export const LoginBlock = () => {
    const history = useHistory();
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [user, loading, error] = useAuthState(auth);
    const [errorInEmailId, setErrorInEmailId] = useState(false);
    const [errorInPassword, setErrorInPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleSubmit = async () => {
        const response = await logInWithEmailAndPassword(email, password);
        console.log(response);
        if (user) history.replace("/home");
        // if (error === "FirebaseError: Firebase: Error (auth/user-not-found).") {
        //     setErrorInEmailId(true);
        // } else if (error === "FirebaseError: Firebase: Error (auth/wrong-password).") {
        //     setErrorInPassword(true);
        // }
    };

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (!user) { }
    }, [user, loading]);


    return (
        <>
            <Toolbar />
            < Grow in={true} timeout={500} >
                <Box style={{ width: '100%', height: '83vh', paddingTop: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Card variant='outlined' className='CreateBoardCard' style={{ maxWidth: '600px', maxHeight: '800px' }}>
                        <CardHeader
                            className='LoginHeader'
                            title='Login'
                            titleTypographyProps={{ variant: 'h4' }}
                        />
                        <CardContent className='LoginContent'>
                            <TextField
                                error={errorInEmailId}
                                className='LoginTextField'
                                required
                                id='filled-required'
                                label='Email ID'
                                placeholder='Enter Email ID'
                                helperText={errorInEmailId ? "Invalid E-Mail ID" : ""}
                                variant='outlined'
                                onChange={(event: ChangeEvent<HTMLInputElement>) => { setemail(event.target.value); setErrorInEmailId(false) }}
                            />
                            <TextField
                                error={errorInPassword}
                                type={showPassword ? "text" : "password"}
                                className='LoginTextField'
                                required
                                id='filled-required'
                                label='Password'
                                placeholder='Enter Password'
                                variant='outlined'
                                helperText={<Link href="forgotPassword" underline="hover">
                                    {'Forgot Password?'}
                                </Link>}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => { setPassword(event.target.value); setErrorInPassword(false) }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>,
                                }}
                            />
                        </CardContent>


                        <CardActions className='LoginAction'>
                            <Button
                                type='submit'
                                variant='contained'
                                color='primary'
                                onClick={() => handleSubmit()}
                                className='LoginButton'>
                                Login
                            </Button>
                        </CardActions>

                        <CardActions className='LoginAction'>
                            <Button
                                type='submit'
                                variant='contained'
                                color='primary'
                                onClick={() => signInWithGoogle()}
                                className='LoginButton'>
                                Login with Google
                            </Button>
                        </CardActions>

                        <CardContent className='LoginContent'>
                            Don't have an Account? <Link href="Register">Register here!</Link>
                        </CardContent>
                    </Card>
                </Box>
            </Grow >
        </>
    );
};
