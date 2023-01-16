import { Button, Card, CardActions, CardContent, CardHeader, Grow, TextField } from '@material-ui/core';
import { Email } from '@material-ui/icons';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import './LoginBlock.css';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from '../../firebase';
import { Routes } from '../../service/config';

export const LoginBlock = () => {
    const history = useHistory();
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');

    const [passwordShown, setPasswordShown] = useState(false);
    const handleSubmit = () => {
        logInWithEmailAndPassword(email, password)
        console.log("success")
        localStorage.setItem("token", JSON.stringify(email));
        setTimeout(function () {
            window.location.reload();
        }, 2000);
    };


    return (

        < Grow in={true} timeout={500} >

            <Card variant='outlined' className='CreateBoardCard'>
                <CardHeader
                    className='LoginHeader'
                    title='Login'
                    titleTypographyProps={{ variant: 'h4' }}
                />
                <CardContent className='LoginContent'>
                    <TextField
                        className='LoginTextField'
                        required
                        id='filled-required'
                        label='Email ID'
                        placeholder='Please enter your Email ID'

                        variant='outlined'
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setemail(event.target.value)}
                    />
                    {/* <input /> */}
                    <TextField
                        type={passwordShown ? "text" : "password"}
                        className='LoginTextField'
                        required
                        id='filled-required'
                        label='Password'
                        placeholder='Please enter your Password'

                        variant='outlined'
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                    />
                    {/* <button onClick={togglePassword}>Show Password</button> */}
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
                    Don't have an Account? Register here!
                </CardContent>
                <CardContent className='LoginContent'>
                    Forgot Password?
                </CardContent>
            </Card>

        </Grow >
    );
};
