import React from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, makeStyles, Box } from '@material-ui/core'
import LoginIcon from '@mui/icons-material/Login';
import { Link, useHistory } from 'react-router-dom';
import { useState ,useEffect} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from "../redux/userRedux";

const useStyles = makeStyles((theme) => ({
    paperStyle: { marginTop: 115, padding: 20, height: '55vh', width: 350, margin: "20px auto", },
    avatarStyle: { backgroundColor: '#1bbd7e' },
    emailField:{margin:'20px 0px'},
    PassField:{margin:'10px 0px'},
    btnstyle: { margin: '8px 0' },
    spanstyle: { color: "red", marginTop: "10px" }
}));
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const classes = useStyles();
    const dispatch = useDispatch();
    const history= useHistory();
    const { isFetching, error } = useSelector((state) => state.user);
    const user = useSelector((state) => state.user.currentUser);
    useEffect(() => {
        if(user){
            history.push('/')
        }
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        login(dispatch, { email, password });
    };
    const login = async (dispatch, user) => {
        dispatch(loginStart());
        try {
            const result = await axios.post("http://localhost:8000/user/login", {
                email,
                password,
            });
            dispatch(loginSuccess(result.data));
            localStorage.setItem('currentUser',JSON.stringify(result.data))
            window.location.href='/'
        } catch (err) {
            dispatch(loginFailure());
        }
    };
    return (
        <Grid>
            <Paper elevation={10} className={classes.paperStyle}>
                <Grid align='center'>
                    <Avatar className={classes.avatarStyle}><LoginIcon /></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField className={classes.emailField} variant='filled' label='Email' placeholder='Enter email' type='email' onChange={(e) => setEmail(e.target.value)} fullWidth required />
                <TextField className={classes.PassField} variant='filled' label='Password' placeholder='Enter password' type='password' onChange={(e) => setPassword(e.target.value)} fullWidth required />
                <Button  color='primary' onClick={handleSubmit} disabled={isFetching} variant="contained" className={classes.btnstyle} fullWidth>Sign in</Button>
                {error && <Box component="span" className={classes.spanstyle}>Email or Password is Incorrect!</Box>}
                <Typography > Do you have an account?
                    <Link to="/register">
                        Register
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login