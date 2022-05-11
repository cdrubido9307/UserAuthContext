import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockIcon from '@mui/icons-material/Lock';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import Error from './Error';
import { useLocation } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { useNavigate } from "react-router-dom";
import Loading from './Loading';
import Success from './Success';

const theme = createTheme({
    palette: {
        primary: {
            main: '#592E83',
        },
        secondary: {
            main: '#564787',
        },
    },
});

export default function ConfirmSignUp() {
    let location = useLocation();
    let navigate = useNavigate();
    const [code, setCode] = useState(null);
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [successSubmessage, setSuccessSubmessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showButton, setShowButton] = useState(true);
    const [confirmCodeError, setConfirmCodeError] = useState(false);
    const validationRegex = /[0-9]{6}$/;

    const handleConfirmSignUp = async () => {
        try {
            await Auth.confirmSignUp(location.state.username, code);
            navigate("/");
        } catch (error) {
            setErrorMessage(error.message);
            setShowError(true);
            setShowButton(true);
            console.log('error confirming code', error);
        }
    };

    const handleResendConfirmationCode = async () => {
        try {
            await Auth.resendSignUp(location.state.username);
            setSuccessMessage("Confirmation code send successfully.");
            setSuccessSubmessage("Enter the confirmation code!");
            setShowSuccess(true);
        } catch (error) {
            setErrorMessage(error.message);
            setShowError(true);
            console.log('error resending confirming code', error);
        }
    };

    const handleSubmit = (event) => {
        setShowButton(false);
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setCode(
            data.get('authCode')
        );
    };

    const handleConfirmOnChange = (e) => {
        let value = e.target.value;
        setConfirmCodeError(!validationRegex.test(parseInt(value)));
    };

    useEffect(() => {
        if (code !== null) {
            handleConfirmSignUp();
        }
    }, [code]);

    return (
        <ThemeProvider theme={theme}>
            <Error show={showError} onClickHideError={() => { setShowError(false) }} message={errorMessage} />
            <Success show={showSuccess} onClickHideSuccess={() => { setShowSuccess(false) }} message={successMessage} submessage={successSubmessage}/>
            <Container
                component="main"
                maxWidth="xs"
                sx={{
                    mt: 20
                }}
            >
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
                        Verification
                    </Typography>
                    <Avatar sx={{ mb: 2, bgcolor: 'primary.main' }}>
                        <Grid >
                            <LockIcon />
                        </Grid>
                    </Avatar>
                    <Typography align="center" >
                        Please enter the verification code
                    </Typography>
                    <Typography align="center" >
                        we send to your email address.
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="authCode"
                            label="Verification Code"
                            name="authCode"
                            autoComplete="authCode"
                            autoFocus
                            onClick={() => {
                                setShowError(false);
                                setShowSuccess(false);
                            }}
                            onChange={handleConfirmOnChange}
                            {...(confirmCodeError && {error: true, helperText: "Enter a valid code"})}
                        />
                        {showButton ?
                            <Box>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Verify
                                </Button>
                                <Typography align="center" >
                                Didn't get the code?
                                </Typography>
                                <Button variant="text" onClick={() => {handleResendConfirmationCode()}}>Resend confirmation code</Button>
                                {/* <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="" variant="contained"
                                    onClick={() => {
                                        handleResendConfirmationCode();
                                    }}
                                >
                                    Didn't get the code? Resend confirmation code
                                </Link>
                            </Grid>
                        </Grid> */}
                            </Box>
                            :
                            <Loading />
                        }
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}