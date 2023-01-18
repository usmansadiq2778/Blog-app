import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import { makeStyles, Tooltip } from '@material-ui/core';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const useStyle = makeStyles(theme => ({
    component: {
        background: '#F5EBEB !important' ,
        color: 'black !important',
        height: '13vh'
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
        marginLeft: 40,
        marginRight:20,
        padding: 10
    },
    link2:{
        textDecoration: 'none',
        color: 'inherit',
        marginLeft: 40,
        marginRight:20,
        padding: 20,
    }
}))
const Navbar = () => {
    const history = useHistory();
    const classes = useStyle();
    const user = useSelector((state) => state.user.currentUser);
    // this state make for change avatar without refreshing page
    const userprofile = useSelector((state) => state.userprofile.currentUserprofile);
    const [userprofiledata, setUserprofiledata] = useState('');
    const imgbefore = `http://localhost:8000/${userprofiledata.slice(7,)}`;
    useEffect(() => {
      const fetchData = async () => {
          const response = await axios.get(`http://localhost:8000/userprofile/${user.id}`);
          // console.log(response.data.userprofile.picture)
          setUserprofiledata(response.data.userprofile.picture);
          // console.log(userprofiledata.slice(7,))
      }
      fetchData();
  }, [userprofile])
    function logout() {
        localStorage.clear();
        history.push('/login')
    }
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar className={classes.component}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6" noWrap component="div" sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
            <img src={logo} height={90} width={120} />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <Link to='/' className={classes.link2}>
                    <Typography>HOME</Typography>
                </Link>
                 <Link to='/about' className={classes.link2}>
                     <Typography>ABOUT</Typography>
               </Link>
                {user?
                    <>
                        <Link to='/createuserprofile' className={classes.link2}>
                            <Typography>PROFILE</Typography>
                        </Link>
                        <Link onClick={logout} to='/login' className={classes.link2} >
                            <Typography>SIGN OUT</Typography>
                        </Link>
                    </> :
                    <>
                        <Link to='/login' className={classes.link2}>
                            <Typography>LOGIN</Typography>
                        </Link>
                        <Link to='/register' className={classes.link2}>
                            <Typography>REGISTER</Typography>
                        </Link>
                    </>
                }
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <img src={logo} height={90} width={120} />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Link to='/' className={classes.link}>
                    <Typography>HOME</Typography>
                </Link>
                 <Link to='/about' className={classes.link}>
                     <Typography>ABOUT</Typography>
               </Link>
                {user?
                    <>
                        <Link to='/createuserprofile' className={classes.link}>
                            <Typography>PROFILE</Typography>
                        </Link>
                        <Link onClick={logout} to='/login' className={classes.link}>
                            <Typography>SIGN OUT</Typography>
                        </Link>
                        <Avatar alt="Remy Sharp" src={imgbefore}  sx={{display:'none'}}/>
                    </> :
                    <>
                        <Link to='/login' className={classes.link}>
                            <Typography>LOGIN</Typography>
                        </Link>
                        <Link to='/register' className={classes.link}>
                            <Typography>REGISTER</Typography>
                        </Link>
                    </>
                }
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {user?
            <>
            <Tooltip title={user.name.toUpperCase()}>
            <Avatar alt="Remy Sharp" src={imgbefore}  sx={{display:'block', height: '60px', width: '60px'}}/>
            </Tooltip>
            </>
            :
            <Link to='/login' className={classes.link}>
                <Typography><AccessibilityNewIcon /></Typography>
            </Link>
        }
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" >{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;