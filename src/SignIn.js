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
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Auth } from 'aws-amplify';
import Error from './Error';
import Loading from './Loading';
import { AppContext } from './AppContext';

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

export default function SignIn() {
    let navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [showButton, setShowButton] = useState(true);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLogged, setIsLogged] = useState(false);
    const appContext = useContext(AppContext);

    const handleSignIn = async () => {
        try {
            const loggedUser = await Auth.signIn(user.username, user.password);
            appContext.onChangeUser(loggedUser);
            navigate("/dashboard");
        } catch (error) {
            setErrorMessage(error.message);
;           setShowError(true);
            setShowButton(true);
            console.log('Error signing in:', error);
        }
    };

    const handleSubmit = (event) => {
        setShowButton(false);
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setUser({
            username: data.get('username'),
            password: data.get('password'),
        });
    };

    useEffect(() => {
        if (user !== null) {
            handleSignIn();
        }
    }, [user]);

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
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        {showButton ?
                            <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        : <Loading/>
                        }
                        <Grid container sx={{mt: 1}}>
                            <Grid item xs>
                                <Link href="" variant="contained">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="" variant="contained"
                                    onClick={() => {
                                        navigate("/signup");
                                    }}
                                >
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}