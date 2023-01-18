import { Button, makeStyles } from '@material-ui/core';
import { categories } from './data';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { categoryFailure, categoryStart, categorySuccess } from "../redux/categoryRedux";
import './category.css'
const useStyle = makeStyles({
   button:{
margin:5,
width: '43%',
background: 'inherit',
   },
    
    table: {
        listStyle:'none',
        width:'100%',
    },
    name:{
        color:"gray",
    },
    data:{
        fontSize:25,
        marginTop:10,
        fontWeight:600,
    },
    data2:{
     textAlign:'center',
     marginLeft: -50,

    }



})

const Categories = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    function handleClick(e) {
        const value = e.currentTarget.getAttribute("value")
        dispatch(categoryStart());
        if (value) {
            dispatch(categorySuccess(value));
        }
        else {
            dispatch(categoryFailure());
        }
    }
    const borderRemove = {textDecoration:'none'}
    return (
        <>
            <Link to='createpost' style={borderRemove}>
                <Button variant="contained"  className='button' style={{ fontSize: '18px' }} >Create Blog</Button>
            </Link>
            <nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
     <div className={classes.data}>Categories</div> 
    </div>
    <ul class="nav navbar-nav" style={{listStyle:'none'}}>
      <li className={classes.data2}>{Object.keys(categories).map((key) => <Button variant="text" className={classes.button}  style={{ fontSize: '14px' }} key={key} value={categories[key]} onClick={handleClick}>{key}</Button>)}</li>
    </ul>
  </div>
</nav>
        </>
    )
}

export default Categories;