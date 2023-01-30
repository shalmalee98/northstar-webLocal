import { useState } from 'react';
import { Box, Typography, TextField, TextareaAutosize, Button, } from '@mui/material';

const ContactUs = () => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const submitForm = (e) => {
        e.preventDefault();
        console.log({ email, firstName, subject, message });

        const Subject = subject + " - ( " + email + " )";
        const Body = "Email: " + email + "<br>" + "Name: " + firstName + "<br><br>" + "Message: <br>" + message.replaceAll("\n", "<br>");

        if (window.Email) {
            window.Email.send({
                Host: "smtp.elasticemail.com",
                Username: process.env.REACT_APP_USERNAME,
                Password: process.env.REACT_APP_PASSWORD,
                To: 'northstar.team23@gmail.com',
                From: "northstar.team23@gmail.com",
                Subject: `${Subject}`,
                Body: `${Body}`
            }).then(
                message => alert(message)
            );
        }
    };

    return (

        <Box style={{ marginTop: '80px', marginBottom: '80px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

            <Box style={{ width: '650px', paddingTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'aliceblue', borderRadius: '20px' }}>
                <Typography variant="h4">
                    Contact Us
                </Typography>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    sx={{ marginY: '20px' }}
                    style={{ width: '550px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                >
                    <TextField
                        label="Full Name"
                        variant="outlined"
                        fullWidth
                        sx={{ marginTop: '10px' }}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />

                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        sx={{ marginTop: '10px' }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <TextField
                        label="Subject"
                        variant="outlined"
                        fullWidth
                        sx={{ marginTop: '10px' }}
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />

                    <TextareaAutosize
                        aria-label="minimum height"
                        minRows={6}
                        placeholder="Enter a message"
                        spellCheck
                        style={{ marginTop: '10px', width: '550px' }}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />

                    <Button
                        variant="contained"
                        type="submit"
                        color="primary"
                        sx={{ width: '200px', fontSize: '16px', marginTop: '10px' }}
                        onClick={submitForm}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default ContactUs;