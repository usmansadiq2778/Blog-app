import { Typography, Box, makeStyles } from "@material-ui/core";
import { Delete } from '@material-ui/icons';
import {useState,useEffect} from 'react'
import axios from "axios";
import { useSelector } from 'react-redux';
import { ArrowRight } from "@material-ui/icons";

const useStyles = makeStyles({
    component: {
        width: "30%",
margin:" 10px 125px",
        background: '#F7F7F7',
        padding: 10   
     },
    container: {
        display: 'flex',
        marginBottom: 5,
        alignItems:"center"
    },
    name: {
        fontWeight: 600,
        fontSize: 18,
        marginRight: 20
    },
    date: {
        fontSize: 14,
        color: '#878787'
    },
    delete: {
        marginLeft: 'auto'
    },
    commFlex:{
        display: "flex"
    }
})

const Comment = ({ comment, setToggle }) => {
    const classes = useStyles();
    const commentid = comment.id;
    const [flag, setFlag] = useState(false);
    const [username, setUsername] = useState('');
    const user = useSelector((state) => state.user.currentUser);
    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(`http://localhost:8000/user/${comment.userId}`)
            setUsername(response.data.name);
        }
        getData();
        if (user) {
            setFlag(true);
        }
    }, [])
    const removeComment = async () => {
        try {
            await axios.delete(`http://localhost:8000/comment/${commentid}/delete`, {
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem('currentUser')).accesstoken
                }
            }
            );
        } catch (error) {
            console.log('Error while calling deletecomment API ', error)
        }
        setToggle(prev => !prev);
    }
    return (
        <Box className={classes.component}>
            <Box className={classes.container}>
                <Typography className={classes.name}>{username}</Typography>
                <Typography className={classes.date}>{new Date(comment.createdAt).toDateString()}</Typography>
                {
                    flag ?
                        user.id === comment.userId ?
                            <Delete className={classes.delete} onClick={() => removeComment()} />
                            : null
                        : null
                }
            </Box>
            <Typography className={classes.commFlex}><ArrowRight/> {comment.commenttext}</Typography>
        </Box>
    )
}
export default Comment;