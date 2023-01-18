import React, { useState, useEffect } from 'react';
import { Grid, Button, Card, CardContent, Typography, makeStyles } from '@material-ui/core';
import { AddCircle as Add } from '@material-ui/icons';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useHistory } from 'react-router-dom';
import { userprofileFailure, userprofileStart, userprofileSuccess } from "../redux/userprofileRedux";
const useStyle = makeStyles(theme => ({
    Userprofile:{
        fontFamily:"Quicksand"
    },
    container: {
        margin: '100px 110px',
        [theme.breakpoints.down('md')]: {
            marginTop: 110,
        },
    },
    text1:{
        borderBottom: "2px solid #DBD7D7",
        width: '30%',
    },
    paddingadd:{
        padding: '10px 20px',
        borderBottom:"1px solid gray",
        border:"none",
        backgroundColor:"#F0F0F0"
    },
    picture: {
        textAlign: 'center',
        margin:"auto",
        display: 'block',
        width: "160px",
        height: "160px",
        borderRadius: "80px",
        boxShadow: 'rgb(0 0 1 / 30%) 0px 5px 10px',
        border: '4px solid #E6C8C5',
    },
    spanstyle: { color: "red", marginTop: "10px" },
    addIcon: { marginLeft: 190 },
}));
const initialUserprofile = {
    gender: '',
    phonenumber: '',
    bio: '',
    picture:'',
}
const CreateUserprofile = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.currentUser);
    const [userprofiledata, setUserprofiledata] = useState(initialUserprofile);
    const [imageurl, setImageurl] = useState('');
    const { isFetching, error } = useSelector((state) => state.userprofile);
    const imgbefore = `http://localhost:8000/${userprofiledata.picture.slice(7,)}`
    const userid = user.id;
    const name = user.name;
    const email = user.email;
    useEffect(() => {
        const getImage = async () => {
            if (userprofiledata.picture) {
                var reader = new FileReader();
                reader.onloadend = function () {
                    setImageurl(reader.result)
                }
                reader.readAsDataURL(userprofiledata.picture);
            }
        }
        getImage();
    }, [userprofiledata.picture])
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:8000/userprofile/${userid}`)
            setUserprofiledata({gender: response.data.userprofile.gender,phonenumber: response.data.userprofile.phonenumber, bio: response.data.userprofile.bio,picture:response.data.userprofile.picture})
        }
        fetchData()
    }, [])
    const saveUserprofile = async () => {
        await createUserprofile(dispatch, userprofiledata);
    }
    const handleChange = (e) => {
        setUserprofiledata({ ...userprofiledata, [e.target.name]: e.target.type==="file"? e.target.files[0]:e.target.value });
    }
    const createUserprofile = async (dispatch, userprofile) => {
        dispatch(userprofileStart());
        try {
            const data = new FormData();
            data.append("picture", userprofiledata.picture);
            data.append("gender", userprofiledata.gender);
            data.append("phonenumber", userprofiledata.phonenumber);
            data.append("bio", userprofiledata.bio);
            const result = await axios.post(`http://localhost:8000/userprofile/${userid}`,
                data, {
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem('currentUser')).accesstoken
                }
            }
            );
            dispatch(userprofileSuccess(result.data));
            alert('User Profile Saved Successfully!');
        } catch (err) {
            alert('Profile not Saved, Something went Wrong!')
            dispatch(userprofileFailure());
        }
    };
    return (
        <div className="Userprofile">
            <Grid className={classes.container}>
                <Card style={{ maxWidth: 450, padding: "25px 5px", margin: "0 auto", boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"}}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" className={classes.text1}>
                            User Profile
                        </Typography>
                        <div>
                            <img src={imageurl ? imageurl : imgbefore} alt="No Profile Picture" className={classes.picture} />
                            <label htmlFor="fileInput">
                                <Add className={classes.addIcon} fontSize="large" color="action" />
                            </label>
                        </div>
                        <Grid container spacing={1} direction="row" justifyContent="center" alignItems="center">
                            <Grid item xs={7} >
                                <input value={name} variant="outlined" disabled fullWidth className={classes.paddingadd}/>
                            </Grid>
                            <Grid xs={7} item >
                                <input value={email} type='email' variant="outlined" disabled fullWidth className={classes.paddingadd} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} direction="row" justifyContent="center" alignItems="center">
                            <Grid xs={12} sm={12} item >
                                <input
                                    name='picture'
                                    type="file"
                                    id="fileInput"
                                    style={{ display: "none" }}
                                    onChange={(e) => handleChange(e)}
                                />
                            </Grid>
                            <Grid xs={7} item  >
                                <input defaultValue={userprofiledata.gender} name='gender' placeholder="Enter gender" onChange={(e) => handleChange(e)} variant="outlined" fullWidth className={classes.paddingadd}/>
                            </Grid>
                            <Grid item xs={7} >
                                <input defaultValue={userprofiledata.phonenumber} name='phonenumber' type="number" onChange={(e) => handleChange(e)} placeholder="Enter phone number" variant="outlined" fullWidth className={classes.paddingadd}/>
                            </Grid>
                            <Grid item xs={7} >
                                <input defaultValue={userprofiledata.bio} name='bio' multiline rows={4} onChange={(e) => handleChange(e)} placeholder="Type your bio here" variant="outlined" fullWidth className={classes.paddingadd}/>
                            </Grid>
                            <Grid item xs={7} >
                                <Button onClick={saveUserprofile} disabled={isFetching} variant="contained" color="primary" style={{width:'90%'}}>Save Changes</Button>
                            </Grid>
                        </Grid>
                        {error && <Alert severity="error">
                                <AlertTitle>Profile not Saved</AlertTitle>
                                Something went Wrong!
                            </Alert>
                            }
                    </CardContent>
                </Card>
            </Grid>
        </div>
    )
}
export default CreateUserprofile;