import { useState, useEffect } from "react";
import {
  Box,
  TextareaAutosize,
  Button,
  makeStyles,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import Comment from "./Comment";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { useSelector, useDispatch } from "react-redux";
import Checkbox from "@material-ui/core/Checkbox";
import {
  commentFailure,
  commentStart,
  commentSuccess,
} from "../redux/commentRedux";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { IconButton } from "@material-ui/core";
import { SendOutlined } from "@material-ui/icons";
import { AccountCircle } from "@material-ui/icons";

const useStyles = makeStyles({
  container: {
    marginTop: 100,
    display: "flex",
    "& > *": {
      // padding: '10px '
    },
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: "50%",
  },
  textarea: {
    height: 100,
    width: "100%",
    margin: "0 20px",
  },
  button: {
    height: 40,
  },
  spanstyle: { color: "red", marginTop: "10px" },
  fav: {
    color: "#3b5998",
  },
  likeBtn:{
    borderRadius:0,
    "&:hover":{
      backgroundColor:"#e8e8e8",
      borderRadius:0
    }
  },
});
const Comments = ({ postdata }) => {
  const classes = useStyles();
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const url = "https://static.thenounproject.com/png/12017-200.png";
  const [commenttext, setComment] = useState("");
  const [likes, setLikes] = useState("");
  const [comments, setComments] = useState([]);
  const [likedata, setLikedata] = useState();
  const [likeusers, setLikeusers] = useState("");
  const [liked, setLiked] = useState(0);
  const [data, setData] = useState();
  const [toggle, setToggle] = useState(false);
  const { isFetching, error } = useSelector((state) => state.comment);
  const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 500,
    },
  });
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `http://localhost:8000/comment/${postdata.id}`
      );
      setComments(response.data);
    };
    getData();
    const getlikeData = async () => {
      const response = await axios.get(
        `http://localhost:8000/like/${postdata.id}`
      );
      const object = {};
      let i = 0;
      while (i < response.data.length) {
        const str = response.data[i].userId;
        const responsed = await axios.get(`http://localhost:8000/user/${str}`);
        object[`ptr` + i] = responsed.data.name;
        i++;
      }
      let likeusers = Object.values(object);
      setLikeusers(likeusers.toString());
      var size = Object.keys(response.data).length;
      setLikes(size);
    };
    getlikeData();
    const checkUserlike = async () => {
      const response = await axios.get(
        `http://localhost:8000/like/${user.id}/${postdata.id}`
      );
      if (response.data.length > 0) {
        setLiked(response.data.length);
      }
    };
    checkUserlike();
  }, [toggle, postdata, likedata]);
  const saveComment = async (e) => {
    e.preventDefault();
    await createComment(dispatch, { commenttext });
  };
  const handleChange = (e) => {
    setComment(e.target.value);
    setData(e.target.value);
  };
  const likeunlikepost = async () => {
    const response = await axios.post(
      `http://localhost:8000/like/${user.id}/${postdata.id}`,
      {
        headers: {
          Authorization:
            "Bearer " +
            JSON.parse(localStorage.getItem("currentUser")).accesstoken,
        },
      }
    );
    if (response.data) {
      setLikedata(response.data);
    }
  };
  const createComment = async (dispatch, comment) => {
    dispatch(commentStart());
    try {
      const result = await axios.post(
        `http://localhost:8000/comment/${user.id}/${postdata.id}/create`,
        { commenttext },
        {
          headers: {
            Authorization:
              "Bearer " +
              JSON.parse(localStorage.getItem("currentUser")).accesstoken,
          },
        }
      );
      dispatch(commentSuccess(result.data));
    } catch (err) {
      dispatch(commentFailure());
    }
    setData("");
    setToggle((prev) => !prev);
  };

  return (
    <Box>
      <Box className={classes.container}>
        <CustomWidthTooltip title={likeusers}>
          <Button sx={{ m: 1 }}>
            {" "}
            <Box component="h6">{likes} Likes</Box>
          </Button>
        </CustomWidthTooltip>
        {user ? (
          <Checkbox
          className={classes.likeBtn}
            label="like"
            onChange={likeunlikepost}
            icon={
              liked === 0 ? (
                <ThumbUpOutlinedIcon className={classes.fav} />
              ) : (
                <ThumbUpIcon className={classes.fav} />
              )
            }
            checkedIcon={
              liked === 0 ? (
                <ThumbUpOutlinedIcon className={classes.fav} />
              ) : (
                <ThumbUpIcon className={classes.fav} />
              )
            }
          />
        ) : null}
        <TextField
          name="commenttext"
          className={classes.textarea}
          multiline
          rows={1}
          fullWidth
          InputProps={{
            endAdornment: (
              <IconButton>
                <SendOutlined className={classes.button}
          disabled={isFetching}
          onClick={saveComment} />
              </IconButton>
            ),
            startAdornment: (
                <IconButton>
                  <AccountCircle/>
                </IconButton>
              ),
          }}
          placeholder="Write the Comment!"
          onChange={(e) => handleChange(e)}
          value={data}
          variant="filled"
        />
      </Box>
      <Box >
        {comments &&
          comments.map((comment) => (
            <Comment comment={comment} setToggle={setToggle} />
          ))}
      </Box>
      {error && (
        <Box component="span" className={classes.spanstyle}>
          Comment not Created! Please login first.
        </Box>
      )}
    </Box>
  );
};
export default Comments;
