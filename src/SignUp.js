import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { Auth, Hub } from 'aws-amplify';
import Loading from './Loading';
import { useNavigate } from "react-router-dom";
import Error from './Error';

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

export default function SignUp() {
    let navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [showButton, setShowButton] = useState(true);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const handleSignUp = async () => {
        try {
            const { user } = await Auth.signUp({
                ...userData
            });
            navigate("/confirmSignup", {state: {username: user.username}});

            console.log(user);
        } catch (error) {
            setErrorMessage(error.message);
;           setShowError(true);
            setShowButton(true);
            console.log("Error signing up: ", error);
        }
    }
    const handleSubmit = (event) => {
        setShowButton(false);
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setUserData({
            username: data.get('username'),
            password: data.get('password'),
            attributes: {
                email: data.get('email')
            }
        });
    };

    useEffect(() => {
        if (userData !== null) {
            handleSignUp();
        }
    }, [userData]);

    return (
        <ThemeProvider theme={theme}>
            <Error show={showError} onClickHideError={()=>{setShowError(false)}} message={errorMessage}/>
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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    onClick={() => {
                                        setShowError(false);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onClick={() => {
                                        setShowError(false);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onClick={() => {
                                        setShowError(false);
                                    }}
                                />
                            </Grid>
                        </Grid>{
                            showButton ?
                                <Box>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Sign Up
                                    </Button>
                                    <Grid container justifyContent="flex-end">
                                        <Grid item>
                                            <Link href="" variant="contained"
                                                onClick={() => {
                                                    navigate("/");
                                                }}
                                            >
                                                Already have an account? Sign in
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Box>
                                :
                                <Loading></Loading>
                        }
                    </Box>
                </Box>
            </Container>

        </ThemeProvider>
    );
}