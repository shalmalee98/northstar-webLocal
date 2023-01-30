import { Button, Card, CardActions, CardContent, CardHeader, Grow, TextField, InputAdornment, IconButton } from '@material-ui/core';
import Box from '@mui/material/Box';
import { Email, Label } from '@material-ui/icons';
import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import './RegisterBlock.css';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from '../../firebase';
import { Routes } from '../../service/config';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Link from '@mui/material/Link';
import { registerWithEmailAndPassword } from '../../firebase';
import Toolbar from '@mui/material/Toolbar';

const RegisterBlock = () => {
    const history = useHistory();
    const [name, setName] = useState('');
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [user, loading, error] = useAuthState(auth);
    const [passwordShown, setPasswordShown] = useState(false);

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleRegistration = () => {
        registerWithEmailAndPassword(name, email, password)
        // console.log("success")
        // localStorage.setItem("token", JSON.stringify(email));
        // setTimeout(function () {
        //     window.location.reload();
        // }, 2000);
    };

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) history.push("dashboard");
    }, [user, loading]);


    return (
        <>
            <Toolbar />
            < Grow in={true} timeout={500} >
                <Box style={{ width: '100%', height: '83vh', paddingTop: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Card variant='outlined' className='CreateBoardCard' style={{ maxWidth: '600px', maxHeight: '800px' }}>
                        <CardHeader
                            className='LoginHeader'
                            title='Registration'
                            titleTypographyProps={{ variant: 'h4' }}
                        />
                        <CardContent className='LoginContent'>
                            <TextField
                                className='LoginTextField'
                                required
                                id='filled-required'
                                label='Name'
                                placeholder='Enter Name'

                                variant='outlined'
                                onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
                            />
                            <TextField
                                className='LoginTextField'
                                required
                                id='filled-required'
                                label='Email ID'
                                placeholder='Enter Email ID'

                                variant='outlined'
                                onChange={(event: ChangeEvent<HTMLInputElement>) => setemail(event.target.value)}
                            />
                            <TextField
                                type={showPassword ? "text" : "password"}
                                className='LoginTextField'
                                required
                                id='filled-required'
                                label='Password'
                                placeholder='Enter Password'
                                variant='outlined'
                                onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
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
                            <TextField
                                type={showPassword ? "text" : "password"}
                                className='LoginTextField'
                                required
                                id='filled-required'
                                label='Re-enter Password'
                                placeholder='Re-enter Password'
                                variant='outlined'
                                onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
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
                                onClick={() => handleRegistration()}
                                className='LoginButton'>
                                Register
                            </Button>
                        </CardActions>

                        <CardContent className='LoginContent'>
                            Already have an Account? <Link href="/Login">Login here!</Link>
                        </CardContent>
                    </Card>
                </Box>
            </Grow >
        </>
    );
};
export default RegisterBlock;
